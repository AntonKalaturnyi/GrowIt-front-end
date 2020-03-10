import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Creds } from 'src/app/model/Creds';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

 registerForm;
 creds: Creds;
 accountTypes: string[] = ['Borrower', 'Investor'];
 accountType: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private alertService: AlertService, private matRadio: MatRadioModule) {
    this.registerForm = this.formBuilder.group({
      email: '',
      password: '',
      password2: ''
    });
  }

  ngOnInit(): void {
  }

  submit(form) {

    if ( form.password === form.password2 && this.accountType) {
      this.creds = new Creds();
      this.creds.username = form.email;
      this.creds.password = form.password;

    // Process checkout data here

      if (this.accountType === 'Borrower') {
        this.userService.registerBorrower(this.creds).subscribe(data => {
          this.alertService.successMessage('User successfully created', 'SignUp');
        }, error => {
          console.log(error);
          this.alertService.errorMessage(error.error.message, 'Invalid input');
        });
    } else {
      this.userService.registerInvestor(this.creds).subscribe(data => {
        this.alertService.successMessage('User successfully created', 'SignUp');
      }, error => {
        console.log(error);
        this.alertService.errorMessage(error.error.message, 'Invalid input');
      });
    }
  } else {
    this.alertService.errorMessage(' enter valid username and password ', 'Invalid input');
  }
  }

}
