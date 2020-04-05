import { Component } from '@angular/core';
import { PermissionService } from './services/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'GrowIt-front-end';

  constructor(public permissionService: PermissionService) { }

  logOut() {
    localStorage.clear();
  }

}
