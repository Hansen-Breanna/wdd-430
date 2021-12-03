import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../person.model';
import { Subscription } from 'rxjs';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [
    new Person('1', 'Rudolph', '150',
    'https://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/128/rudolph-icon.png', 
    null)
     // "'1', 'Xbox One', 'Microsoft Xbox One 500GB with Original Controller.','https://www.gamestop.com/consoles-hardware/xbox-one/consoles/products/microsoft-xbox-one-500gb-console-black-with-original-controller/101370.html?gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XE-RQ-QulNQ8lLTF89j-_OmsBAo5pCqQAd64bLByP4cicxQFTk558aAqaxEALw_wcB&gclsrc=aw.ds', '../assets/images/xbox-one.jpg', '239.99'")
  ];
  private subscription: Subscription;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    console.log(this.persons);
    //this.persons = this.personService.getPersons();
    // [{
    //   id: '1',
    //   name: 'Rudolph',
    //   budget: '150',
    //   image: 'https://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/128/rudolph-icon.png',
    //   group: [{
    //     id: '1',
    //     name: 'Xbox One',
    //     description: 'Microsoft Xbox One 500GB with Original Controller.',
    //     url: 'https://www.gamestop.com/consoles-hardware/xbox-one/consoles/products/microsoft-xbox-one-500gb-console-black-with-original-controller/101370.html?gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XE-RQ-QulNQ8lLTF89j-_OmsBAo5pCqQAd64bLByP4cicxQFTk558aAqaxEALw_wcB&gclsrc=aw.ds',
    //     image: '../assets/images/xbox-one.jpg',
    //     price: '239.99'
    //     }]
    //   },
    //   {
    //   id: '2',
    //   name: 'Santa',
    //   budget: '100',
    //   image: 'https://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/128/santa-claus-icon.png',
    //   group: [{
    //     id: '2',
    //     name: "Women's Snow Boots",
    //     description: "Pacific Mountain Whiteout Women's Winter Boots",
    //     url: 'https://www.kohls.com/product/prd-2659861/pacific-mountain-whiteout-womens-winter-boots.jsp?skuid=39637069&CID=shopping15&utm_campaign=WOMENS%20BOOTS&utm_medium=CSE&utm_source=google&utm_product=39637069&utm_campaignid=9733267156&gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XYFaqosXRS5mggS9BECMWZu9ciaxXecb8bRlDJ8E_xdUTSCx6M07MaAoyBEALw_wcB&gclsrc=aw.ds',
    //     image: '../assets/images/women-snow-boots.jpg',
    //     price: '100.00'
    //     }]
    //   },
    //   {
    //   id: '3',
    //   name: 'Frosty',
    //   budget: '500',
    //   image: 'https://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/128/snowman-icon.png',
    //   group: [{
    //     id: '3',
    //     name: 'Home Gym',
    //     description: 'G4 Home Gym to get rid of Christmas cookie weight.',
    //     url: 'https://shop.lifefitness.com//products/g4-home-gym?variant=39899400372421&utm_source=google&utm_medium=shopping&utm_campaign=13613782051&utm_content=120754757901&utm_term=&gclid=Cj0KCQiA15yNBhDTARIsAGnwe0V23m6avTcNz0d6-S4Kpf6xTlBChL_Ve_kS9BCKCgd--S8qIxB-S1oaAt95EALw_wcB',
    //     image: '../assets/images/home-gym.jpg',
    //     price: '3,049.00'
    //     }]
    //   }]
    // this.personService.getPersons();
    this.subscription = this.personService.personListChangedEvent.subscribe(
      (personsList: Person[]) => {
        this.persons = personsList;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}