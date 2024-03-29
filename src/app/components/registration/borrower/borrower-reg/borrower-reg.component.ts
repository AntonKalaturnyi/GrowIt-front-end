import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { MatSelect } from '@angular/material/select';
import { PermissionService } from 'src/app/services/permission.service';
import { PrevDataService } from 'src/app/services/prev-data.service';
import { BorrowerRegData } from 'src/app/model/BorrowerRegData';


@Component({
  selector: 'app-borrower-reg',
  templateUrl: './borrower-reg.component.html',
  styleUrls: ['./borrower-reg.component.scss']
})
export class BorrowerRegComponent implements OnInit {

  phoneNum: string;
  regData: BorrowerRegData;
  personalInfoForm;
  codeForm: FormGroup;
  serverCode: string;
  moveToCode = false;
  genders: string[] = ['Male', 'Female'];
  // matitalStatus: string;
  matitalStatuses: string[] = ['Male', 'Female'];
  task: any;


  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
    private userService: UserService, private dataService: PrevDataService, private router: Router) {
    this.personalInfoForm = this.formBuilder.group({
      lastName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^([5-9][0-9]\\d{7})$')]],
      maritalStatus: ['', [Validators.required]],
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

    this.dataService.getBorrowerRegInputData().subscribe(data => {
      this.regData = data;
      if (data.name !== null) {
        this.personalInfoForm.controls.lastName.setValue(this.regData.lastName);
        this.personalInfoForm.controls.name.setValue(this.regData.name);
        this.personalInfoForm.controls.middleName.setValue(this.regData.middleName);
        this.personalInfoForm.controls.gender.setValue(this.regData.gender);
        this.personalInfoForm.controls.birthday.setValue(this.regData.birthday);
        this.personalInfoForm.controls.phone.setValue(this.regData.phone);
        this.phoneNum = this.regData.phone;
        this.personalInfoForm.controls.maritalStatus.setValue(this.regData.maritalStatus);
        this.personalInfoForm.controls.kidsBefore18yo.setValue(this.regData.kidsBefore18yo);
        this.personalInfoForm.controls.kidsAfter18yo.setValue(this.regData.kidsAfter18yo);
        this.personalInfoForm.controls.instagram.setValue(this.regData.instagram);
        this.personalInfoForm.controls.facebook.setValue(this.regData.facebook);
      }
    });
  }

  submit(form) {
    form.birthday = JSON.stringify(form.birthday).replace('Z', '').replace('"', '').replace('"', '').replace('T', ' ');
    form.phone = '+380' + form.phone;
    this.userService.sendBorrowerInfoAndGetSmsCode(form).subscribe((res) => {
      this.serverCode = res.toString();
      if (('+380' + this.phoneNum) !== form.phone) {
        console.log('serverCode= ' + this.serverCode);
        this.moveToCode = true;
      } else {
        this.router.navigateByUrl('borrower/fill-passport');
      }
    }, error => {
      this.moveToCode = false;
      this.alertService.errorMessage(error.error.message, 'Failed to receive SMS code');
    });
  }

  next(form) {
    console.log('NEXT.code = ' + form.code);
    if (form.code === this.serverCode) {
      // this.dataService.moveToUnfilledPage();
      this.dataService.updateFilledInfo();

    } else {
      this.alertService.errorMessage('Please try again', 'SMS code is incorrect');
    }
  }
}
