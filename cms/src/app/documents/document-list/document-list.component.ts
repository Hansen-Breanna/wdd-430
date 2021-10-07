import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Array<Document> = [
    new Document(
      1, 
      'CIT 225 - Database Design and Development', 
      'This course deals with concepts and principles of database theory, application, and management technologies.', 
      'https://www.byui.edu/catalog#/courses/E1qTje2iW?bc=true&bcCurrent=Database%20Design%20%26%20Development&bcGroup=Computer%20Information%20Technology&bcItemType=Courses', 
      null),
    new Document(
      2, 
      'CIT 260 - Object Oriented Programming', 
      'In this course you will learn Object Oriented Programming and the Java programming language by designing and creating a simple game.', 
      'https://www.byui.edu/catalog#/courses/E1qTje2iW?bc=true&bcCurrent=Database%20Design%20%26%20Development&bcGroup=Computer%20Information%20Technology&bcItemType=Courses', 
      null),
    new Document(
      3, 
      'CIT 325 - Database Programming', 
      'This course teaches the concepts of database programming. It teaches how to write stored functions and procedures inside the database, how to use collections, how to use embedded objects, how to use transaction control mechanics, how to import large comma separated files, and large text files into a database.', 
      'https://www.byui.edu/catalog#/courses/41xp6sg3j-?bc=true&bcCurrent=Database%20Programming&bcGroup=Computer%20Information%20Technology&bcItemType=Courses', 
      null),
    new Document(
      4, 
      'CIT 495 - Senior Practicum', 
      'This is a capstone experience for the Computer Information Technology major.', 
      'https://www.byui.edu/catalog#/courses/EkzCog3sW?bc=true&bcCurrent=Senior%20Practicum&bcGroup=Computer%20Information%20Technology&bcItemType=Courses', 
      null),
    new Document(
      5, 
      'WDD 430 - Full Web Stack Development', 
      'This course will teach students how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack', 
      'https://www.byui.edu/catalog#/courses/VJkxTr9Ab?bc=true&bcCurrent=Web%20Full-Stack%20Development&bcGroup=Web%20Design%20and%20Development&bcItemType=Courses', 
      null),
  ];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
