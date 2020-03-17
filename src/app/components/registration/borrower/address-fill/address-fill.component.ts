import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-fill',
  templateUrl: './address-fill.component.html',
  styleUrls: ['./address-fill.component.scss']
})
export class AddressFillComponent implements OnInit {

  dataForm;

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      sameAddressInPassport: ['', [Validators.required]],
      region: ['', [Validators.required]],
      district: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      settlement: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      corpsNo: ['', [Validators.required]],
      door: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }

  submit(form) {
    console.log('sameAddressInPassport: ' + form.sameAddressInPassport);
    this.userService.saveBorrowerAddress(form).subscribe(data => {
      this.alertService.successMessage('Адресу успішно збережено!', 'Супер');
      this.router.navigateByUrl('borrower/fill-employment');
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });
  }

}
