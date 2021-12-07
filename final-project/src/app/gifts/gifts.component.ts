import { Component, OnInit } from '@angular/core';
import { Gift } from './gift.model';
import { GiftService } from './gift.service';

@Component({
  selector: 'app-gifts',
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css'],
  providers: [GiftService]
})
export class GiftsComponent implements OnInit {
  selectedGift: Gift;

  constructor(private giftService: GiftService) { }

  ngOnInit(): void {
    this.giftService.giftSelectedEvent.subscribe(
      (gift: Gift) => {
        this.selectedGift = gift;
      }
    )
  }

}

