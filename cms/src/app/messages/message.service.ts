import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
  }

  getMessages(): void {
    // return this.messages.slice();
    this.http.get<Message[]>('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      // success method
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        var messagesListClone = this.messages.slice(); // messagesListClone = messages.slice()
        this.messageChangedEvent.emit(messagesListClone);//emit the next message list change event
        this.maxMessageId = this.getMaxId();
      },
      // error method
      (error: any) => {
        console.log(error.message); //print the error to the console
      });
  }

  getMessage(id: string): Message {
    for (let message of this.messages) { 
      if (message.id == id) { 
        return message; 
      }
    }
    return null; 
  }

  addMessage(newMessage: Message) {
    if (!newMessage) { //if newContact is undefined or null then
      return;
    } //endIf

    this.maxMessageId = this.getMaxId();
    this.maxMessageId++; //this.maxContactId++
    console.log(this.maxMessageId);
    newMessage.id = this.maxMessageId.toString();
    console.log(newMessage);
    this.messages.push(newMessage);
    this.storeMessages(this.messages);
  }

  getMaxId(): number {
    var maxId = 0;
    for (let message of this.messages) { //for each message in the messages list
      var currentId = parseInt(message.id); //currentId = convert message.id into a number
      if (currentId > maxId) { //if currentId > maxId then
        maxId = currentId; //maxId = currentId
      } //endIf
    } //endFor
    return maxId;
  }

  storeMessages(messages: Message[]) {
    //const messages = JSON.stringify(this.getMessages());
    //Create a new HttpHeaders object that sets the Content-Type of the HTTP request to application/json.
    this.http.put('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/messages.json', messages,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    )
      .subscribe(response => {
        var messagesListClone = this.messages.slice();
        this.messageChangedEvent.emit(messagesListClone);
      });
  }
}