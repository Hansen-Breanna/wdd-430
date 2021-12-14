import { Component, OnInit, Input } from '@angular/core';
import { Gift } from '../../gift.model';
import { PersonService } from '../../../persons/person.service';
import { Person } from '../../../persons/person.model'

@Component({
  selector: 'app-gift-item',
  templateUrl: './gift-item.component.html',
  styleUrls: ['./gift-item.component.css']
})
export class GiftItemComponent implements OnInit {
  @Input() gift: Gift;
  giftRecipient: string;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    if (!this.gift.image) {
      this.gift.image = "../../../../assets/images/no-image-found.jpg";
    }
    const person: Person = this.personService.getPerson(this.gift.recipient);
    this.giftRecipient = person.name;
  }
}
