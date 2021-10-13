import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string) {
    for (let message of this.messages) { // FOR each contact in the contacts list
      if (message.id == id) { // IF contact.id equals the id THEN
        return message; //RETURN contact
      }
    }
    return null; //    RETURN null 
  }
}



