import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

loginForm;
errorMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, 
              private router: Router, private alertService: AlertService) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
  }

  onSubmit(creds) {
    // Process checkout data here
    this.userService.authUser(creds).subscribe(data => {
      data.roles.forEach(element => {
          localStorage.setItem(element.name, 'true');
        });
      localStorage.setItem('token', data.token);
      console.log(data.token);
      localStorage.setItem('email', data.username);
  }, error => {
      this.errorMessage = error;
      this.alertService.timeoutError('Password or email is incorrect', 'Bad credantials', 4200);
  }
  );
  }

  toSignUp() {
    this.router.navigateByUrl('/home/signup');
  }

  toForgotPassword() {
    this.router.navigateByUrl('/home/forgot-password');
  }
}
