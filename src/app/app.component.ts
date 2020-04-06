import { Component, OnInit } from '@angular/core';
import { PermissionService } from './services/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'GrowIt-front-end';

  constructor(public permissionService: PermissionService, private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('login');

  }

  logOut() {
    localStorage.clear();
  }

}
