import { Component, OnInit } from '@angular/core';
import { Person } from './person.model';
import { PersonService } from './person.service';

@Component({
  selector: 'app-person',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
  providers: [PersonService]
})
export class PersonsComponent implements OnInit {
  selectedPerson: Person;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.personSelectedEvent.subscribe(
      (person: Person) => {
        this.selectedPerson = person;
      }
    )
  }

}