import { Component } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    constructor(public permissionService: PermissionService) { }

    logOut() {
      localStorage.clear();
    }
}
