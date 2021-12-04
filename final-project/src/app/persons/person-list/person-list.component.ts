import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../person.model';
import { Subscription } from 'rxjs';
import { PersonService } from '../person.service';
import { GiftService } from 'src/app/gifts/gift.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private personService: PersonService, private giftService: GiftService) { }

  async ngOnInit() {
    // this.persons = [
    //   new Person('1', 'Rudolph', '150',
    //   'https://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/128/rudolph-icon.png', 
    //   null)
    //    // "'1', 'Xbox One', 'Microsoft Xbox One 500GB with Original Controller.','https://www.gamestop.com/consoles-hardware/xbox-one/consoles/products/microsoft-xbox-one-500gb-console-black-with-original-controller/101370.html?gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XE-RQ-QulNQ8lLTF89j-_OmsBAo5pCqQAd64bLByP4cicxQFTk558aAqaxEALw_wcB&gclsrc=aw.ds', '../assets/images/xbox-one.jpg', '239.99'")
    // ];
    this.persons = this.personService.getPersons();
    await this.giftService.getGiftsFromDB();
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