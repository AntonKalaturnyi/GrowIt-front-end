import { Component, OnInit } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-investor-reg',
  templateUrl: './investor-reg.component.html',
  styleUrls: ['./investor-reg.component.scss']
})
export class InvestorRegComponent implements OnInit {

personalInfoForm;
finalForm;
serverCode: string;
moveToCode = false;
genders: string[] = ['Male', 'Female'];

  constructor(private radio: MatRadioModule, private formBuilder: FormBuilder, private alertService: AlertService,
              private datepicker: MatDatepickerModule, private userService: UserService) {
    this.personalInfoForm = this.formBuilder.group({
      lastName:  ['', [Validators.required]],
      name:  ['', [Validators.required]],
      middleName:  ['', [Validators.required]],
      gender:  ['', [Validators.required]],
      birthday:  ['', [Validators.required]],
      phone:  ['', [Validators.required, Validators.pattern('^(0[5-9][0-9]\\d{7})$')]]
    });
   }

  ngOnInit(): void {
  }


  next() {
    // send get to backend = code
    // this.userService.getSmsCodeForUser(task.usersOrganizationsId.toString(), this.orgId).subscribe((res) => {


    // }, error => {
    //   this.alertService.errorMessage(error.error.message, 'Invalid input')
    // });

    // this.moveToCode = true;



  }

  proceed(form) {
    this.finalForm = form;

  }
}
