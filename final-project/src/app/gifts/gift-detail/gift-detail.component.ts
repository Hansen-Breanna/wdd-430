import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gift } from '../gift.model';
import { GiftService } from '../gift.service';

@Component({
  selector: 'app-gift-detail',
  templateUrl: './gift-detail.component.html',
  styleUrls: ['./gift-detail.component.css']
})
export class GiftDetailComponent implements OnInit {
  @Input() gift: Gift;
  id: string;

  constructor(
    private giftService: GiftService, 
    private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.gift = this.giftService.getGift(this.id);
      }
    );
  }

  onDelete() {
    console.log("gift deleted");
    // this.giftService.deleteGift(this.gift);
    this.router.navigate(['gifts']), {relativeTo: this.route}; 
  }
}
