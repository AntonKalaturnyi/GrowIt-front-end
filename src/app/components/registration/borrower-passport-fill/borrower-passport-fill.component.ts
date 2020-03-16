import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-borrower-passport-fill',
  templateUrl: './borrower-passport-fill.component.html',
  styleUrls: ['./borrower-passport-fill.component.scss']
})
export class BorrowerPassportFillComponent implements OnInit {

  constructor(public permissionService: PermissionService) { }

  ngOnInit(): void {
  }

}
