import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  styles: [`
  h3 {
    color: dodgerblue;
  }
  .white-text {
    color: white;
}`]
})
export class AppComponent {
  username = '';
  log = [];
  showSecret = false;

  onToggleDetails() {
    this.showSecret = !this.showSecret;
    this.log.push(this.log.length + 1);
  }

  onLogClick() {
    let count = this.log.length;
    this.log.push(count + 1);
  }

}
