import { Component, OnInit, Input } from '@angular/core';
import { Gift } from '../../gift.model';

@Component({
  selector: 'app-gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.css']
})
export class GiftItemComponent implements OnInit {
  @Input() gift: Gift;

  constructor() { }

  ngOnInit(): void {
  }

}
