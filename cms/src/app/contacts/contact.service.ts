import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact [] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  
  constructor() {
     this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {  // should this be getContacts() only?
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for(let contact of this.contacts) { // FOR each contact in the contacts list
      if(contact.id == id) { // IF contact.id equals the id THEN
        return contact; //RETURN contact
      }
    }
    return null; //    RETURN null 
   } 
}
