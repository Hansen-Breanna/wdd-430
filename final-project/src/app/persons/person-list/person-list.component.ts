import { Component, OnInit, OnDestroy } from '@angular/core';
import { Person } from '../person.model';
import { Subscription } from 'rxjs';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  private subscription: Subscription;
  term: string;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.persons = this.personService.getPersons();
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