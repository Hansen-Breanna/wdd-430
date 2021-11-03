import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  ngOnInit(): void {

  }
  
  onCancel() {

  }
}