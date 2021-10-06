import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Array<Document> = [
    new Document(1, 'CIT 225 - Database Design and Development', 'This course deals with concepts and principles of database theory, application, and management technologies.', 'https://content.byui.edu/file/b4125b6b-6da2-4176-9a6e-728acaa7c5fa/3/syllabus.html', null),
    new Document(2, 'CIT 260 - Object Oriented Programming', 'In this course you will learn Object Oriented Programming and the Java programming language by designing and creating a simple game.', 'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html', null),
    new Document(3, 'CIT 425 - Data Warehousing', 'This course defines the theory and practice of data analysis.', 'https://www.byui.edu/computer-information-technology/courses', null),
    new Document(5, 'CIT 495 - Senior Practicum', 'is a capstone experience for the Computer Information Technology major.', 'https://www.byui.edu/computer-information-technology/courses', null),
    new Document(2, 'WDD 430 - Full Web Stack Development', 'This course will teach students how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack', 'https://byui.instructure.com/courses/164460/assignments/syllabus', null),
  ];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
