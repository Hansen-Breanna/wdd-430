import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: true}) subjectInputRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "Breanna Hansen";

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage(msgTextInputRef: HTMLInputElement, subjectInputRef: HTMLInputElement) {
    const msgSubject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(10, msgSubject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
    this.subjectInputRef.nativeElement.value = "new";
  }

  onClear(msgTextInputRef: HTMLInputElement, subjectInputRef: HTMLInputElement) {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
