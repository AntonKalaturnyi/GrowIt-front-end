import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { InvestorPassportDto } from 'src/app/model/InvestorPassportDto';
import { PermissionService } from 'src/app/services/permission.service';
import { BorrowerPassportDto } from 'src/app/model/BorrowerPassportDto';

@Component({
  selector: 'app-borrower-passport-fill',
  templateUrl: './borrower-passport-fill.component.html',
  styleUrls: ['./borrower-passport-fill.component.scss']
})
export class BorrowerPassportFillComponent implements OnInit {

  docsForm;
  formData: FormData;
  selectedFile: File = null;
  dto: BorrowerPassportDto = new BorrowerPassportDto();
  passportTypes: string[] = ['ID-картка', 'Паперовий паспорт'];


  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private router: Router) {
    this.docsForm = this.formBuilder.group({
      passportType: ['', [Validators.required]],
      idPassNumber: [''],
      paperPassSeries: [''],
      paperPassNumber: [''],
      issueDate: ['', [Validators.required]],
      issuerRegion: ['', [Validators.required]],
      issuerName: ['', [Validators.required]],
      issuerLocationRegion: ['', [Validators.required]],
      region: ['', [Validators.required]],
      district: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      settlement: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      corpsNo: ['', [Validators.required]],
      door: ['', [Validators.required]],
      itnNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }



  submit(form) {
    if (form.passportType === 'ID-картка') {
      this.dto.idPassport = true;
      this.dto.idPassNumber = form.idPassNumber;
    } else {
      this.dto.idPassport = false;
      this.dto.paperPassSeries = form.paperPassSeries;
      this.dto.paperPassNumber = form.paperPassNumber;
    }
    this.formData = new FormData();
    this.formData.append('file', this.selectedFile);
    this.formData.append('dto', new Blob([JSON.stringify({
      email: localStorage.getItem('email'),
      idPassport: this.dto.idPassport,
      idPassNumber: form.idPassNumber,
      paperPassSeries: form.paperPassSeries,
      paperPassNumber: form.paperPassNumber,
      issueDate: JSON.stringify(form.issueDate).replace('Z', '').replace('"', '').replace('"', '').replace('T', ' '),
      issuer: form.issuerRegion + ' МВ ' + form.issuerName + ' в ' + form.issuerLocationRegion + ' області',
      itnNumber: form.itnNumber,
      region: form.region,
      district: form.district,
      postalCode: form.postalCode,
      settlement: form.settlement,
      street: form.street,
      number: form.number,
      corpsNo: form.corpsNo,
      door: form.door
    })], {
      type: 'application/json'
    }));

    this.userService.saveBorrowerPassportAndItn(this.formData).subscribe(data => {
      this.alertService.successMessage('Документи успішно збережено!', 'Супер');
      this.router.navigateByUrl('borrower/fill-address');
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });
  }
}
