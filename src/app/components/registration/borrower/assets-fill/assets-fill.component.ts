import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assets-fill',
  templateUrl: './assets-fill.component.html',
  styleUrls: ['./assets-fill.component.scss']
})
export class AssetsFillComponent implements OnInit {

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private router: Router) {
  }

  dataForm;

  ngOnInit(): void {
  }

  submit(form) {
    
  }

}
