import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-investor-cabinet',
  templateUrl: './investor-cabinet.component.html',
  styleUrls: ['./investor-cabinet.component.scss']
})
export class InvestorCabinetComponent implements OnInit {

  constructor(public permissionService: PermissionService) { }

  ngOnInit(): void {
  }

}
