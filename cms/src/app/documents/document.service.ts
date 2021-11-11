import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.http.get<Document[]>('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else {
              return -1;
            }
          });//sort the list of documents
          var documentsListClone = this.documents.slice(); // documentsListClone = documents.slice()
          this.documentListChangedEvent.next(documentsListClone);//emit the next document list change event
          this.maxDocumentId = this.getMaxId();
        },
        // error method
        (error: any) => {
          console.log(error.message); //print the error to the console
        });
  }

  getDocuments(): Document[] { // Changed from 'Document[]'
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
    this.storeDocuments();
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
    this.storeDocuments();
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
    this.storeDocuments();
  }

  storeDocuments() {
    const documents = JSON.stringify(this.getDocuments());
    //Create a new HttpHeaders object that sets the Content-Type of the HTTP request to application/json.
    this.http.put('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/documents.json', documents,
      {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
    )
      .subscribe(response => {
        this.documents.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else {
            return -1;
          }
        });
        var documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      });
  }
}