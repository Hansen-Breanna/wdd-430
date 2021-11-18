import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.http.get<Contact[]>('http://localhost:3000/contacts')
      .subscribe(
        // success method
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contacts = JSON.parse(JSON.stringify(this.contacts)).contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else {
              return -1;
            }
          });//sort the list of contacts
          var contactsListClone = this.contacts.slice(); // contactsListClone = contacts.slice()
          this.contactListChangedEvent.next(contactsListClone);//emit the next contact list change event
          this.maxContactId = this.getMaxId();
        },
        // error method
        (error: any) => {
          console.log(error.message); //print the error to the console
        });
  }

  getContactsFromDB() {
    this.http.get<Contact[]>('http://localhost:3000/contacts')
    .subscribe(
      // success method
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.contacts = JSON.parse(JSON.stringify(this.contacts)).contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });//sort the list of contacts
        var contactsListClone = this.contacts.slice(); // contactsListClone = contacts.slice()
        this.contactListChangedEvent.next(contactsListClone);//emit the next contact list change event
        this.maxContactId = this.getMaxId();
      },
      // error method
      (error: any) => {
        console.log(error.message); //print the error to the console
      });
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    console.log("test contacts: " + this.contacts);
    for (let contact of this.contacts) { // FOR each contact in the contacts list
      if (contact.id == id) { // IF contact.id equals the id THEN
        return contact; //RETURN contact
      } 
    }
    return null; // RETURN null 
  }

  getMaxId(): number {
    var maxId = 0;
    for (let contact of this.contacts) { //for each contact in the contacts list
      var currentId = parseInt(contact.id); //currentId = convert contact.id into a number
      if (currentId > maxId) { //if currentId > maxId then
        maxId = currentId; //maxId = currentId
      } //endIf
    } //endFor
    return maxId;
  }

  // addContact(newContact: Contact) {
  //   if (newContact == undefined || null) { //if newContact is undefined or null then
  //     return;
  //   } //endIf

  //   this.maxContactId++; //this.maxContactId++
  //   newContact.id = `${this.maxContactId}`; //newContact.id = this.maxContactId
  //   this.contacts.push(newContact);//push newContact onto the contacts list
  //   this.storeContacts();
  // }

  
addContact(contact: Contact) {
  if (!contact) {
    return;
  }

  // make sure id of the new contact is empty
  contact.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    contact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        // this.sortAndSend();
      }
    );
}


  // updateContact(originalContact: Contact, newContact: Contact) {
  //   if ((originalContact == undefined || null) || (newContact == undefined || null)) {
  //     //if originalContact or newContact is undefined or null then
  //     return; // return
  //   } // endIf

  //   var pos = this.contacts.indexOf(originalContact);// pos = contacts.indexOf(originalContact)
  //   if (pos < 0) { // if pos < 0 then
  //     return;  // return
  //   }// endIf

  //   newContact.id = originalContact.id; // newContact.id = originalContact.id
  //   this.contacts[pos] = newContact; // contacts[pos] = newContact
  //   this.storeContacts();
  // }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          // this.sortAndSend();
        }
      );
  }

  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          // this.sortAndSend();
        }
      );
  }

  storeContacts() {
    const contacts = JSON.stringify(this.getContacts());
    //Create a new HttpHeathis.sorters object that sets the Content-Type of the HTTP request to application/json.
    this.http.put('http://localhost:3000/contacts', contacts,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    )
      .subscribe(response => {
        this.contacts.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
        var contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      });
  }
}
