import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { Gift } from '../../gifts/gift.model';
import { GiftService } from 'src/app/gifts/gift.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  originalPerson: Person;
  person: Person;
  groupGifts: Gift[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private personService: PersonService,
    private giftService: GiftService,    
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        var id = params.personId;
        if (id == undefined || null) {
          this.editMode = false;
          return;
        }
        this.originalPerson = this.personService.getPerson(id);

        if (this.originalPerson == undefined || null) {
          return;
        }
        this.editMode = true;
        this.person = JSON.parse(JSON.stringify(this.originalPerson));

        if (this.person.group) {
          this.groupGifts = this.giftService.getGifts().filter((item) => item['recipient'] === this.id);      
        }
      });
  }

  onCancel() {
    this.router.navigate(['/people']), { relativeTo: this.route };
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPerson = new Person(value.id, value.name, value.budget, value.image, this.groupGifts);
    if (this.editMode) {
      this.personService.updatePerson(this.originalPerson, newPerson);
    } else {
      this.personService.addPerson(newPerson);
    }
    this.editMode = false;
    this.router.navigate(['/people']), { relativeTo: this.route };
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupGifts.length) {
      return;
    }
    this.groupGifts.splice(index, 1);
  }
}