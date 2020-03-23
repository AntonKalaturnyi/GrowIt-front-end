import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { PermissionService } from 'src/app/services/permission.service';
import { BorrowerPassportDto } from 'src/app/model/BorrowerPassportDto';
import { PrevDataService } from 'src/app/services/prev-data.service';
import { BorrowerDocsData } from 'src/app/model/BorrowerDocsData';

@Component({
  selector: 'app-borrower-passport-fill',
  templateUrl: './borrower-passport-fill.component.html',
  styleUrls: ['./borrower-passport-fill.component.scss']
})
export class BorrowerPassportFillComponent implements OnInit {

  docsForm;
  fileName: string;
  formData: FormData;
  docsData: BorrowerDocsData;
  selectedFile: File = null;
  dto: BorrowerPassportDto = new BorrowerPassportDto();
  passportTypes: string[] = ['ID-картка', 'Паперовий паспорт'];


  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private dataService: PrevDataService, private router: Router) {
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
      postalCode: ['', [Validators.required, Validators.pattern('^\\d{5}')]],
      settlement: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      corpsNo: [''],
      door: ['', [Validators.required]],
      itnNumber: ['', [Validators.required, , Validators.pattern('^\\d{10}')]],
    });
  }

  ngOnInit(): void {
    this.dataService.getBorrowerDocsInputData().subscribe(data => {
      this.docsData = data;
      if (this.docsData.postalCode !== null) {
      this.docsForm.controls.passportType.setValue(this.docsData.idPassport ? 'ID-картка' : 'Паперовий паспорт');
      this.docsForm.controls.idPassNumber.setValue(this.docsData.idPassNumber);
      this.docsForm.controls.paperPassSeries.setValue(this.docsData.paperPassSeries);
      this.docsForm.controls.paperPassNumber.setValue(this.docsData.paperPassNumber);
      this.docsForm.controls.issueDate.setValue(this.docsData.issueDate);
      this.docsForm.controls.issuerRegion.setValue(this.docsData.issuer.substring(0, this.docsData.issuer.indexOf(' МВ ')));
      // tslint:disable-next-line: max-line-length
      this.docsForm.controls.issuerName.setValue(this.docsData.issuer.substring(this.docsData.issuer.indexOf(' МВ ') + 4, this.docsData.issuer.indexOf(' в')));
      // tslint:disable-next-line: max-line-length
      this.docsForm.controls.issuerLocationRegion.setValue(this.docsData.issuer.substring(this.docsData.issuer.indexOf(' в ') + 3, this.docsData.issuer.length - 8));
      this.docsForm.controls.region.setValue(this.docsData.region);
      this.docsForm.controls.district.setValue(this.docsData.district);
      this.docsForm.controls.postalCode.setValue(this.docsData.postalCode);
      this.docsForm.controls.settlement.setValue(this.docsData.settlement);
      this.docsForm.controls.street.setValue(this.docsData.street);
      this.docsForm.controls.number.setValue(this.docsData.number);
      this.docsForm.controls.corpsNo.setValue(this.docsData.corpsNo);
      this.docsForm.controls.door.setValue(this.docsData.door);
      this.docsForm.controls.itnNumber.setValue(this.docsData.itnNumber);
      this.fileName = this.docsData.fileName;
      this.selectedFile = new File([], this.fileName);
}
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
  }

  deleteFileSelected() {
    this.selectedFile = null;
  }

  goBack() {
    this.router.navigateByUrl('new-borrower');
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
    this.formData.append('file', this.selectedFile);
    this.formData.append('dto', new Blob([JSON.stringify({
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
