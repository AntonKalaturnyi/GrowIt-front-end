import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { PrevDataService } from 'src/app/services/prev-data.service';
import { BorrowerAddressData } from 'src/app/model/BorrowerAddressData';

@Component({
  selector: 'app-address-fill',
  templateUrl: './address-fill.component.html',
  styleUrls: ['./address-fill.component.scss']
})
export class AddressFillComponent implements OnInit {

  dataForm;
  addrData: BorrowerAddressData;

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private dataService: PrevDataService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      sameAddressInPassport: ['', [Validators.required]],
      region: ['', [Validators.required]],
      district: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      settlement: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      corpsNo: [''],
      door: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {

    this.dataService.getBorrowerAddressInputData().subscribe(data => {
      this.addrData = data;
      this.dataForm.controls.sameAddressInPassport.setValue(this.addrData.sameAddressInPassport);
      this.dataForm.controls.region.setValue(this.addrData.region);
      this.dataForm.controls.district.setValue(this.addrData.district);
      this.dataForm.controls.postalCode.setValue(this.addrData.postalCode);
      this.dataForm.controls.settlement.setValue(this.addrData.settlement);
      this.dataForm.controls.street.setValue(this.addrData.street);
      this.dataForm.controls.number.setValue(this.addrData.number);
      this.dataForm.controls.corpsNo.setValue(this.addrData.corpsNo);
      this.dataForm.controls.door.setValue(this.addrData.door);
    });
  }


  goBack() {
    this.router.navigateByUrl('borrower/fill-passport');
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
