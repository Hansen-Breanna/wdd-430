import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})

export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe( //route.subscribe(
      (params: Params) => { //(params: Params) =>
        var id = params.id;//`${params.id}`; //id = value of id parameter in params list
        if (params.id == undefined || null) {//if id parameter is undefined or null then
          console.log("new contact");
          this.editMode = false;//editMode = false
          return; //return
        }//endif
        this.originalContact = this.contactService.getContact(id);
        //originalContact = getContact(id)

        if (this.originalContact == undefined || null) {
          // if originalContact is undefined or null then
          return;//return
        }//endif
        this.editMode = true;//set editMode to true
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        //Contact = clone originalContact

        if (this.contact.group) {//if the contact has a group then
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          //groupContacts = clone the contact’s group
        }//endif
      });
  }

  onCancel() {
    this.router.navigate(['/contacts']), { relativeTo: this.route };
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(value.id, value.name, value.email, value.phone, value.imageUrl, value.group);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.editMode = false;
    this.router.navigate(['/contacts']), { relativeTo: this.route };
  }


  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}