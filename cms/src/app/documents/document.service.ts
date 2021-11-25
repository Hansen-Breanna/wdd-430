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
    this.http.get<Document[]>('http://localhost:3000/documents')//('https://wdd-430-cms-5f4a1-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        // success method
        (documents: Document[]) => {
          this.documents = documents;
          this.documents = JSON.parse(JSON.stringify(this.documents)).documents;
          console.log(documents);
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  sortAndSend() {
    this.documents.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      } else {
        return -1;
      }
    });
    this.documentListChangedEvent.next([...this.documents]);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }

  // deleteDocument(document: Document) {
  //   if (document == undefined || null) {// if document is undefined or null then
  //     return; //  return
  //   }// endIf

  //   var pos = this.documents.indexOf(document);// pos = documents.indexOf(document)
  //   if (pos < 0) {// if pos < 0 then
  //     return;//  return
  //   }// endIf

  //   this.documents.splice(pos, 1); // documents.splice(pos, 1)
  //   this.storeDocuments();
  // }

  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          const updatedDocuments = this.documents.filter(d => d.id !== document.id);
          this.documents = updatedDocuments;
          this.documents.splice(pos, 1);
          this.documentListChangedEvent.next([...this.documents]);
          // this.sortAndSend();
        }
      );
  }

  storeDocuments() {
    const documents = JSON.stringify(this.getDocuments());
    //Create a new HttpHeaders object that sets the Content-Type of the HTTP request to application/json.
    this.http.put('http://localhost:3000/documents', documents,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
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