
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from '../person.model';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  @Input() person: Person;
  id: string;

  constructor(
    private personService: PersonService, 
    private route: ActivatedRoute, 
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.person = this.personService.getPerson(this.id);
      }
    );
  }

  onDelete() {
    console.log("person deleted");
    // this.personService.deletePerson(this.person);
    this.router.navigate(['people']), {relativeTo: this.route}; 
  }
}
