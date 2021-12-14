import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../../persons/person.model';
import { Gift } from '../gift.model';
import { Subscription } from 'rxjs';
import { PersonService } from '../../persons/person.service';
import { GiftService } from 'src/app/gifts/gift.service';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit, OnDestroy {
  gifts: Gift[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private giftService: GiftService, private personService: PersonService) { }

  async ngOnInit() {
    this.gifts = this.giftService.getGifts();
    await this.personService.getPersonsFromDB();
    this.subscription = this.giftService.giftListChangedEvent.subscribe(
      (giftsList: Gift[]) => {
        this.gifts = giftsList;
      }
    )
  }

  search(value: string) {
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

