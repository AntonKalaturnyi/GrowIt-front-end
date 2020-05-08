import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { PrevDataService } from 'src/app/services/prev-data.service';
import { BorrowerAddressData } from 'src/app/model/BorrowerAddressData';
import { RegNavPanelComponent } from '../reg-nav-panel/reg-nav-panel.component';

@Component({
  selector: 'app-address-fill',
  templateUrl: './address-fill.component.html',
  styleUrls: ['./address-fill.component.scss']
})
export class AddressFillComponent implements OnInit {

  docsFilled: boolean;
  dataForm;
  addrData: BorrowerAddressData;

  types: string[] = [
    'Власна квартира',
    'Орендована квартира',
    'Кімната/гуртожиток',
    'Власний будинок',
    'Оселя батьків/родичів',
    'Готель/хостел'
  ];

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
    private userService: UserService, private dataService: PrevDataService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      sameAddressInPassport: [''],
      region: ['', [Validators.required]],
      district: [''],
      postalCode: ['', [Validators.required, Validators.pattern('^\\d{5}')]],
      settlement: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      corpsNo: [''],
      door: ['', [Validators.required]],
      homeType: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
    this.dataService.getBorrowerAddressData().subscribe(data => {
      this.addrData = data;
      if (data.settlement !== null) {
        this.dataForm.controls.sameAddressInPassport.setValue(this.addrData.sameAddressInPassport === null ? false : this.addrData.sameAddressInPassport);
        this.dataForm.controls.region.setValue(this.addrData.region);
        this.dataForm.controls.district.setValue(this.addrData.district);
        this.dataForm.controls.postalCode.setValue(this.addrData.postalCode);
        this.dataForm.controls.settlement.setValue(this.addrData.settlement);
        this.dataForm.controls.street.setValue(this.addrData.street);
        this.dataForm.controls.number.setValue(this.addrData.number);
        this.dataForm.controls.corpsNo.setValue(this.addrData.corpsNo);
        this.dataForm.controls.door.setValue(this.addrData.door);
        this.dataForm.controls.homeType.setValue(this.addrData.homeType);
      }
    });
    this.dataService.getWhichSectionsFilledData().subscribe(data => {
      this.docsFilled = data.docsFilled;
    });
  }

  toggleAutofill(bit: boolean) {

    if (bit) {
      this.dataService.getBorrowerAddressFromPassword().subscribe(data => {
          this.dataForm.controls.region.setValue(data.region);
          this.dataForm.controls.district.setValue(data.district);
          this.dataForm.controls.postalCode.setValue(data.postalCode);
          this.dataForm.controls.settlement.setValue(data.settlement);
          this.dataForm.controls.street.setValue(data.street);
          this.dataForm.controls.number.setValue(data.number);
          this.dataForm.controls.corpsNo.setValue(data.corpsNo);
          this.dataForm.controls.door.setValue(data.door);
      });

    } else {

      this.dataForm.controls.region.setValue(null);
      this.dataForm.controls.district.setValue(null);
      this.dataForm.controls.postalCode.setValue(null);
      this.dataForm.controls.settlement.setValue(null);
      this.dataForm.controls.street.setValue(null);
      this.dataForm.controls.number.setValue(null);
      this.dataForm.controls.corpsNo.setValue(null);
      this.dataForm.controls.door.setValue(null);

    }
  }

  goBack() {
    this.router.navigateByUrl('borrower/fill-passport');
  }


  submit(form) {
    if (form.sameAddressInPassport == null || form.sameAddressInPassport === '') {
      form.sameAddressInPassport = false;
    }
    this.userService.saveBorrowerAddress(form).subscribe(data => {
      this.dataService.updateFilledInfo();
      this.alertService.successMessage('Адресу успішно збережено!', 'Супер');
      // this.dataService.moveToUnfilledPage();
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });
  }

}
