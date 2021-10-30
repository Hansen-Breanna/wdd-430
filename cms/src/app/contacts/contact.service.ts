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

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
    var contactsListClone = this.contacts.slice(); // contactsListClone = contacts.slice()
    this.contactListChangedEvent.next(contactsListClone); // contactListChangedEvent.next(contactsListClone)
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
    var contactsListClone = this.contacts.slice(); // contactsListClone = contacts.slice()
    this.contactListChangedEvent.next(contactsListClone);// contactListChangedEvent.next(contactsListClone)
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
    var contactsListClone = this.contacts.slice(); // contactsListClone = contacts.slice()
    this.contactListChangedEvent.next(contactsListClone); // contactListChangedEvent.next(doumentsListClone)
  }
}
