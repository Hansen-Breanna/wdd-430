import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { Gift } from '../../gifts/gift.model';

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
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe( //route.subscribe(
      (params: Params) => { //(params: Params) =>
        var id = params.id;//`${params.id}`; //id = value of id parameter in params list
        if (params.id == undefined || null) {//if id parameter is undefined or null then
          console.log("new person");
          this.editMode = false;//editMode = false
          return; //return
        }//endif
        this.originalPerson = this.personService.getPerson(id);
        //originalPerson = getPerson(id)

        if (this.originalPerson == undefined || null) {
          // if originalPerson is undefined or null then
          return;//return
        }//endif
        this.editMode = true;//set editMode to true
        this.person = JSON.parse(JSON.stringify(this.originalPerson));
        //Person = clone originalPerson

        if (this.person.group) {//if the person has a group then
          this.groupGifts = JSON.parse(JSON.stringify(this.originalPerson.group));
          //groupGifts = clone the person’s group
        }//endif
      });
  }

  onCancel() {
    this.router.navigate(['/people']), { relativeTo: this.route };
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPerson = new Person(value.id, value.name, value.budget, value.image, this.groupGifts);
    if (this.editMode) {
      // this.personService.updatePerson(this.originalPerson, newPerson);
    } else {
      // this.personService.addPerson(newPerson);
    }
    this.editMode = false;
    this.router.navigate(['/people']), { relativeTo: this.route };
  }


  isInvalidPerson(newPerson: Person) {
    if (!newPerson) {// newPerson has no value
      return true;
    }
    if (this.person && newPerson.id === this.person.id) {
      return true;
    }
    for (let i = 0; i < this.groupGifts.length; i++) {
      if (newPerson.id === this.groupGifts[i].id) {
        return true;
      }
    }
    return false;
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupGifts.length) {
      return;
    }
    this.groupGifts.splice(index, 1);
  }
}