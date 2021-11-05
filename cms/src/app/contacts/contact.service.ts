import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.http.get<Contact[]>('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      // success method
      (contacts: Contact[]) => {
        console.log("test" + contacts)
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
        var contactsListClone = this.contacts.slice(); 
        this.contactListChangedEvent.next(contactsListClone);
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
    for (let contact of this.contacts) { // FOR each contact in the contacts list
      if (contact.id == id) { // IF contact.id equals the id THEN
        return contact; //RETURN contact
      }
    }
    return null; //    RETURN null 
  }

  // deleteContact(contact: Contact) {
  //   if (!contact) {
  //     return;
  //   }
  //   const pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }
  //   this.contacts.splice(pos, 1);
  //   this.contactListChangedEvent.next(this.contacts.slice());
  // }

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

  addContact(newContact: Contact) {
    if (newContact == undefined || null) { //if newContact is undefined or null then
      return;
    } //endIf

    this.maxContactId++; //this.maxContactId++
    newContact.id = `${this.maxContactId}`; //newContact.id = this.maxContactId
    this.contacts.push(newContact);//push newContact onto the contacts list
    this.storeContacts();
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if ((originalContact == undefined || null) || (newContact == undefined || null)) {
      //if originalContact or newContact is undefined or null then
      return; // return
    } // endIf

    var pos = this.contacts.indexOf(originalContact);// pos = contacts.indexOf(originalContact)
    if (pos < 0) { // if pos < 0 then
      return;  // return
    }// endIf

    newContact.id = originalContact.id; // newContact.id = originalContact.id
    this.contacts[pos] = newContact; // contacts[pos] = newContact
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (contact == undefined || null) {// if contact is undefined or null then
      return; //  return
    }// endIf

    var pos = this.contacts.indexOf(contact);// pos = contacts.indexOf(contact)
    if (pos < 0) {// if pos < 0 then
      return;//  return
    }// endIf

    this.contacts.splice(pos, 1); // contacts.splice(pos, 1)
    this.storeContacts();
  }

  storeContacts() {
    const contacts = JSON.stringify(this.getContacts());
    //Create a new HttpHeaders object that sets the Content-Type of the HTTP request to application/json.
    this.http.put('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/contacts.json', contacts,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    )
      .subscribe(response => {
        console.log(response);
        var contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      });
  }
}
