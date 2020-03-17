import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-borrower-cabinet',
  templateUrl: './borrower-cabinet.component.html',
  styleUrls: ['./borrower-cabinet.component.scss']
})
export class BorrowerCabinetComponent implements OnInit {

  constructor(public permissionService: PermissionService) { }

  ngOnInit(): void {
  }

}
