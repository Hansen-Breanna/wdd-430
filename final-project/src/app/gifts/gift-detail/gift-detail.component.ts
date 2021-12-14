import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gift } from '../gift.model';
import { GiftService } from '../gift.service';
import { WindRefService } from 'src/app/wind-ref.service';
import { Person } from '../../persons/person.model';
import { PersonService } from '../../persons/person.service';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent implements OnInit {
  @Input() gift: Gift;
  id: string;
  giftUrl = '';
  nativeWindow: any;
  giftRecipient: string;

  constructor(
    private giftService: GiftService, 
    private route: ActivatedRoute, 
    private router: Router,
    private windRefService: WindRefService,
    private personService: PersonService) {
      this.nativeWindow = windRefService.getNativeWindow();
     }

  async ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['giftId'];
        this.gift = this.giftService.getGift(this.id);
        this.giftUrl = this.gift.url;
        const person: Person = this.personService.getPerson(this.gift.recipient);
        this.giftRecipient = person.name;
      }
    );
  }

  onView() {
    if(this.gift.url) {
      this.nativeWindow.open(this.gift.url);
    }
  }

  onDelete() {
    this.giftService.deleteGift(this.gift);
    this.router.navigate(['gifts']), {relativeTo: this.route}; 
  }
}
