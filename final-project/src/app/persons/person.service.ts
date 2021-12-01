import { Injectable, EventEmitter } from '@angular/core';
import { Person } from './person.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  persons: Person[] = [];
  personSelectedEvent = new EventEmitter<Person>();
  personListChangedEvent = new Subject<Person[]>();
  maxPersonId: number;

  constructor(private http: HttpClient) {
    this.http.get<Person[]>('http://localhost:3000/persons')//('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/persons.json')
      .subscribe(
        // success method
        (persons: Person[]) => {
          this.persons = persons;
          this.persons = JSON.parse(JSON.stringify(this.persons)).persons;
          console.log(persons);
          this.maxPersonId = this.getMaxId();
          this.persons.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else {
              return -1;
            }
          });//sort the list of persons
          var personsListClone = this.persons.slice(); // personsListClone = persons.slice()
          this.personListChangedEvent.next(personsListClone);//emit the next person list change event
          this.maxPersonId = this.getMaxId();
        },
        // error method
        (error: any) => {
          console.log(error.message); //print the error to the console
        });
  }

  getPersons(): Person[] {
    return this.persons.slice();
  }

  getPerson(id: string): Person {
    for (let person of this.persons) {
      if (person.id == id) {
        return person;
      }
    }
    return null;
  }

  getMaxId(): number {
    var maxId = 0;
    for (let person of this.persons) { //for each person in the persons list
      var currentId = parseInt(person.id); //currentId = convert person.id into a number
      if (currentId > maxId) { //if currentId > maxId then
        maxId = currentId; //maxId = currentId
      } //endIf
    } //endFor
    return maxId;
  }

  addPerson(person: Person) {
    if (!person) {
      return;
    }

    // make sure id of the new Person is empty
    person.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, person: Person }>('http://localhost:3000/persons',
      person,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new person to persons
          this.persons.push(responseData.person);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.persons.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    this.personListChangedEvent.next([...this.persons]);
  }

  updatePerson(originalPerson: Person, newPerson: Person) {
    if (!originalPerson || !newPerson) {
      return;
    }

    const pos = this.persons.findIndex(d => d.id === originalPerson.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Person to the id of the old Person
    newPerson.id = originalPerson.id;
    // newPerson._id = originalPerson._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/persons/' + originalPerson.id,
      newPerson, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.persons[pos] = newPerson;
          this.sortAndSend();
        }
      );
  }

  // deletePerson(person: Person) {
  //   if (person == undefined || null) {// if person is undefined or null then
  //     return; //  return
  //   }// endIf

  //   var pos = this.persons.indexOf(person);// pos = persons.indexOf(person)
  //   if (pos < 0) {// if pos < 0 then
  //     return;//  return
  //   }// endIf

  //   this.persons.splice(pos, 1); // persons.splice(pos, 1)
  //   this.storePersons();
  // }

  deletePerson(person: Person) {

    if (!person) {
      return;
    }

    const pos = this.persons.findIndex(d => d.id === person.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/persons/' + person.id)
      .subscribe(
        (response: Response) => {
          const updatedPersons = this.persons.filter(d => d.id !== person.id);
          this.persons = updatedPersons;
          this.persons.splice(pos, 1);
          this.personListChangedEvent.next([...this.persons]);
          // this.sortAndSend();
        }
      );
  }

  storePersons() {
    const persons = JSON.stringify(this.getPersons());
    //Create a new HttpHeaders object that sets the Content-Type of the HTTP request to application/json.
    this.http.put('http://localhost:3000/persons', persons,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      }
    )
      .subscribe(response => {
        this.persons.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
        var personsListClone = this.persons.slice();
        this.personListChangedEvent.next(personsListClone);
      });
  }
}