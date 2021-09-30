import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Array<Message> = [
    new Message(1, "Welcome to John", "Welcome to our newest team member, John Pemberly!", "Breanna Hansen"),
    new Message(2, "Printer broken", "The printer in office 23 is scheduled for repairs. Please use the printer in office 22.", "John Matus"),
    new Message(3, "Printer back online", "The printer in office 23 has been repaired. Regular print jobs may resume.", "Lacey Wilcox")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
