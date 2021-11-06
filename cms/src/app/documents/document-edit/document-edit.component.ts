import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( //route.subscribe(
      (params: Params) => { //(params: Params) =>
        var id = params.id;//`${params.id}`; //id = value of id parameter in params list
        if (params.id == undefined || null) {//if id parameter is undefined or null then
          this.editMode = false;//editMode = false
          return; //return
        }//endif
        this.originalDocument = this.documentService.getDocument(id);
        //originalDocument = getDocument(id)

        if (this.originalDocument == undefined || null) {
          // if originalDocument is undefined or null then
          return;//return
        }//endif
        this.editMode = true;//set editMode to true
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
        //document = clone originalDocument
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value; //value = form.value // get values from form’s fields
    const newDocument = new Document(value.id, value.name, value.description, value.url, value.children); //newDocument = new Document()
    //Assign the values in the form fields to the corresponding properties in the newDocument
    if (this.editMode) { //if (editMode = true) then
      this.documentService.updateDocument(this.originalDocument, newDocument);//documentService.updateDocument(originalDocument, newDocument)
    } else {//else
      this.documentService.addDocument(newDocument);  //documentService.addDocument(newDocument)
    } //endIf
    this.editMode = false;
    this.router.navigate(['/documents']), { relativeTo: this.route }; //route back to the '/documents' URL 
  }

  onCancel() {
    this.router.navigate(['/documents']), { relativeTo: this.route }; 
  }
}