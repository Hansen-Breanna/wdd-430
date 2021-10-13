import { Component, OnInit } from '@angular/core';
import { MOCKMESSAGES } from 'src/app/shared/wdd430_document_wk05files/lesson5Files/MOCKMESSAGES';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message [] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
