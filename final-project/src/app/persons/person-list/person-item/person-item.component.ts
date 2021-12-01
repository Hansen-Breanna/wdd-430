import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../person.model';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnInit {
  @Input() person: Person;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}