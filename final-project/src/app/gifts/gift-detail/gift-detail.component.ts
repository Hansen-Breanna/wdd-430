import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gift } from '../gift.model';
import { GiftService } from '../gift.service';
import { WindRefService } from 'src/app/wind-ref.service';

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
  recipient: string = "";

  constructor(
    private giftService: GiftService, 
    private route: ActivatedRoute, 
    private router: Router,
    private windRefService: WindRefService) {
      this.nativeWindow = windRefService.getNativeWindow();
     }

  async ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.gift = this.giftService.getGift(this.id);
        this.giftUrl = this.gift.url;
        console.log(this.giftUrl);
      }
    );
  }

  onView() {
    if(this.gift.url) {
      this.nativeWindow.open(this.gift.url);
    }
  }

  onDelete() {
    console.log("gift deleted");
    // this.giftService.deleteGift(this.gift);
    this.router.navigate(['gifts']), {relativeTo: this.route}; 
  }
}
