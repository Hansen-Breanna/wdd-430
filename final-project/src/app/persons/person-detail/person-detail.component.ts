
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { Gift } from 'src/app/gifts/gift.model';
import { GiftService } from 'src/app/gifts/gift.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  @Input() person: Person;
  id: string;
  gifts: Gift[];
  gift: Gift;

  constructor(
    private personService: PersonService, 
    private giftService: GiftService,
    private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {        
        this.id = params['personId'];
        this.person = this.personService.getPerson(this.id);                
        this.gifts = this.giftService.getGifts().filter((item) => item['recipient'] === this.id);                
      }
    );
  }

  onDelete() {
    this.personService.deletePerson(this.person);
    this.router.navigate(['persons']), {relativeTo: this.route}; 
  }
}
