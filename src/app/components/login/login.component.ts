import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Creds } from 'src/app/model/Creds';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

loginForm;
creds: Creds;

  constructor(private permissionService: PermissionService, private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private alertService: AlertService) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.creds = new Creds();
    this.creds.username = form.email;
    this.creds.password = form.password;
    sessionStorage.clear();
    this.userService.authUser(this.creds);

  }

  toSignUp() {
    this.router.navigateByUrl('/home/signup');
  }

  toForgotPassword() {
    this.router.navigateByUrl('/home/forgot-password');
  }
}
