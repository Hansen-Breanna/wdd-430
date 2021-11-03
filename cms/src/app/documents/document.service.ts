import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    var maxId = 0;
    for (let document of this.documents) { //for each document in the documents list
      var currentId = parseInt(document.id); //currentId = convert document.id into a number
      if (currentId > maxId) { //if currentId > maxId then
        maxId = currentId; //maxId = currentId
      } //endIf
    } //endFor
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == undefined || null) { //if newDocument is undefined or null then
      return;
    } //endIf

    this.maxDocumentId++; //this.maxDocumentId++
    newDocument.id = `${this.maxDocumentId}`; //newDocument.id = this.maxDocumentId
    this.documents.push(newDocument);//push newDocument onto the documents list
    var documentsListClone = this.documents.slice(); // documentsListClone = documents.slice()
    this.documentListChangedEvent.next(documentsListClone); // documentListChangedEvent.next(documentsListClone)
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if ((originalDocument == undefined || null) || (newDocument == undefined || null)) {
      //if originalDocument or newDocument is undefined or null then
      return; // return
    } // endIf

    var pos = this.documents.indexOf(originalDocument);// pos = documents.indexOf(originalDocument)
    if (pos < 0) { // if pos < 0 then
      return;  // return
    }// endIf

    newDocument.id = originalDocument.id; // newDocument.id = originalDocument.id
    this.documents[pos] = newDocument; // documents[pos] = newDocument
    var documentsListClone = this.documents.slice(); // documentsListClone = documents.slice()
    this.documentListChangedEvent.next(documentsListClone);// documentListChangedEvent.next(documentsListClone)
  }

  deleteDocument(document: Document) {
    if (document == undefined || null) {// if document is undefined or null then
      return; //  return
    }// endIf

    var pos = this.documents.indexOf(document);// pos = documents.indexOf(document)
    if (pos < 0) {// if pos < 0 then
      return;//  return
    }// endIf

    this.documents.splice(pos, 1); // documents.splice(pos, 1)
    var documentsListClone = this.documents.slice(); // documentsListClone = documents.slice()
    this.documentListChangedEvent.next(documentsListClone); // documentListChangedEvent.next(doumentsListClone)
  }
}