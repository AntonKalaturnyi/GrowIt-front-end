import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-investor-reg',
  templateUrl: './investor-reg.component.html',
  styleUrls: ['./investor-reg.component.scss']
})
export class InvestorRegComponent implements OnInit {

personalInfoForm;
codeForm: FormGroup;
serverCode: string;
moveToCode = false;
genders: string[] = ['Male', 'Female'];

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private router: Router) {
    this.personalInfoForm = this.formBuilder.group({
      lastName:  ['', [Validators.required]],
      name:  ['', [Validators.required]],
      middleName:  ['', [Validators.required]],
      gender:  ['', [Validators.required]],
      birthday:  ['', [Validators.required]],
      phone:  ['', [Validators.required, Validators.pattern('^(0[5-9][0-9]\\d{7})$')]],
      email: localStorage.getItem('email')
    });

    this.codeForm = new FormGroup({
      code: new FormControl()
   });
   }

  ngOnInit(): void {
  }


  submit(form) {
    form.birthday = JSON.stringify(form.birthday).replace('Z', '').replace('"', '').replace('"', '').replace('T', ' ');
    this.userService.sendInvestorInfoAndGetSmsCode(form).subscribe((res) => {
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
      this.router.navigateByUrl('investor/fill-passport');
    } else {
      this.alertService.errorMessage('Please try again', 'SMS code is incorrect');
    }
  }

}
