import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from '../../persons/person.model';
import { PersonService } from 'src/app/persons/person.service';
import { GiftService } from '../../gifts/gift.service';
import { Gift } from '../../gifts/gift.model';

@Component({
  selector: 'app-gift-edit',
  templateUrl: './gift-edit.component.html',
  styleUrls: ['./gift-edit.component.css']
})
export class GiftEditComponent implements OnInit {
  originalGift: Gift;
  gift: Gift;
  recipient: Person;
  editMode: boolean = false;
  personId: string;

  constructor(
    private giftService: GiftService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe( 
      (params: Params) => {
        this.personId = params.personId;
        var giftId = params.giftId;
        if (params.giftId === undefined || params.giftId === null) {
          this.editMode = false;
          return; 
        }
        this.originalGift = this.giftService.getGift(giftId);

        if (this.originalGift === undefined || this.originalGift === null) {
          return;
        }
        this.editMode = true;
        this.gift = JSON.parse(JSON.stringify(this.originalGift));
      });
  }

  onCancel() {
    this.router.navigate(['/gifts']), { relativeTo: this.route };
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newGift = new Gift(value.id, this.editMode ? this.originalGift.recipient : this.personId, value.name, value.description, value.url, value.image, value.price);
    if (this.editMode) {
      this.giftService.updateGift(this.originalGift, newGift);
    } else {
      //add ObjectId to person.group
      this.giftService.addGift(newGift);
    }
    this.editMode = false;
    this.router.navigate(['/gifts']), { relativeTo: this.route };
  }
}