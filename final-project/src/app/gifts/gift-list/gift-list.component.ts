import { Component, OnInit } from '@angular/core';
import { Gift } from '../gift.model';

@Component({
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {
  gifts: Gift[] = [
    new Gift('1',
    'Xbox One',
    'Microsoft Xbox One 500GB with Original Controller.',
    'https://www.gamestop.com/consoles-hardware/xbox-one/consoles/products/microsoft-xbox-one-500gb-console-black-with-original-controller/101370.html?gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XE-RQ-QulNQ8lLTF89j-_OmsBAo5pCqQAd64bLByP4cicxQFTk558aAqaxEALw_wcB&gclsrc=aw.ds',
    '../assets/images/xbox-one.JPG',
    '239.99')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
