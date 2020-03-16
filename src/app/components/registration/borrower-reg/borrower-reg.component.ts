import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatSelect } from '@angular/material/select';
import { PermissionService } from 'src/app/services/permission.service';


@Component({
  selector: 'app-borrower-reg',
  templateUrl: './borrower-reg.component.html',
  styleUrls: ['./borrower-reg.component.scss']
})
export class BorrowerRegComponent implements OnInit {

personalInfoForm;
codeForm: FormGroup;
serverCode: string;
moveToCode = false;
genders: string[] = ['Male', 'Female'];
// matitalStatus: string;
matitalStatuses: string[] = ['Male', 'Female'];


  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private router: Router) {
    this.personalInfoForm = this.formBuilder.group({
      lastName:  ['', [Validators.required]],
      name:  ['', [Validators.required]],
      middleName:  ['', [Validators.required]],
      gender:  ['', [Validators.required]],
      birthday:  ['', [Validators.required]],
      phone:  ['', [Validators.required, Validators.pattern('^(0[5-9][0-9]\\d{7})$')]],
      email: localStorage.getItem('email'),
      maritalStatus:  ['', [Validators.required]],
      kidsBefore18yo: ['', [Validators.required]],
      kidsAfter18yo: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
      facebook: ['', [Validators.required]]
    });

    this.codeForm = new FormGroup({
      code: new FormControl()
   });
   }

  ngOnInit(): void {
  }

  submit(form) {
    console.log('STATUS: ' + form.maritalStatus);
    console.log('Before: ' + form.kidsBefore18yo);
    console.log('After: ' + form.kidsAfter18yo);
    console.log('Instagram: ' + form.instagram);
    console.log('Facebook: ' + form.facebook);

    form.birthday = JSON.stringify(form.birthday).replace('Z', '').replace('"', '').replace('"', '').replace('T', ' ');
    this.userService.sendBorrowerInfoAndGetSmsCode(form).subscribe((res) => {
      this.serverCode = res.toString();
      console.log('serverCode= ' + this.serverCode);
      this.moveToCode = true;
    }, error => {
      this.moveToCode = false;
      this.alertService.errorMessage(error.error.message, 'Failed to receive SMS code');
    });
  }

  next(form) {
    console.log('NEXT.code = ' + form.code);
    if (form.code === this.serverCode) {
      this.router.navigateByUrl('borrower/fill-passport');
    } else {
      this.alertService.errorMessage('Please try again', 'SMS code is incorrect');
    }
  }
}
