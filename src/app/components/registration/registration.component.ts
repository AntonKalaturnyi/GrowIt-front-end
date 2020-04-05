import { Component, OnInit, NgZone } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Creds } from 'src/app/model/Creds';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

 registerForm;
 creds: Creds;
 accountTypes: string[] = ['Borrower', 'Investor'];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private zone: NgZone,
              private router: Router, private alertService: AlertService, private matRadio: MatRadioModule) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      accountType: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

login(creds: Creds, urlToGo: string) {
  this.userService.authUser(creds);
  this.router.navigateByUrl(urlToGo);
}

  submit(form) {

    if ( form.password === form.password2 && form.accountType) {
      this.creds = new Creds();
      this.creds.username = form.email;
      this.creds.password = form.password;

      if (form.accountType === 'Borrower') {
        this.userService.registerBorrower(this.creds).subscribe(data => {
          this.alertService.successMessage('User successfully created', 'SignUp');
          this.login(this.creds, 'new-loan/calculator');
        }, error => {
          console.log(error);
          this.alertService.errorMessage(error.error.message, 'Invalid input');
        });
    } else {
      this.userService.registerInvestor(this.creds).subscribe(data => {
        this.alertService.successMessage('User successfully created', 'SignUp');
        this.login(this.creds, 'new-investor');
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
