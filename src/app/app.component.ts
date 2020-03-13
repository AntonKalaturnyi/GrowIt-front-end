import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'GrowIt-front-end';

  logOut() {
    localStorage.clear();
 //   AppComponent.loggedIn = false;
  }

}
