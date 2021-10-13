import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (let document of this.documents) { // FOR each contact in the contacts list
      if (document.id == id) { // IF contact.id equals the id THEN
        return document; //RETURN contact
      }
    }
    return null; //    RETURN null 
  }
}

