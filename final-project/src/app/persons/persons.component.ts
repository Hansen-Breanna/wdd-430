import { Component, OnInit } from '@angular/core';
import { Person } from './person.model';

@Component({
  selector: 'app-person',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
  // persons: Person[] = [
  //   new Person('1', 'Rudolph', '150',
  //   'https://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/128/rudolph-icon.png', 
  //   null)
  //    // "'1', 'Xbox One', 'Microsoft Xbox One 500GB with Original Controller.','https://www.gamestop.com/consoles-hardware/xbox-one/consoles/products/microsoft-xbox-one-500gb-console-black-with-original-controller/101370.html?gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XE-RQ-QulNQ8lLTF89j-_OmsBAo5pCqQAd64bLByP4cicxQFTk558aAqaxEALw_wcB&gclsrc=aw.ds', '../assets/images/xbox-one.jpg', '239.99'")
  // ];

  constructor() { }

  ngOnInit(): void {
  }

}
