import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { InvestorPassportDto } from 'src/app/model/InvestorPassportDto';

@Component({
  selector: 'app-investor-passport-fill',
  templateUrl: './investor-passport-fill.component.html',
  styleUrls: ['./investor-passport-fill.component.scss']
})
export class InvestorPassportFillComponent implements OnInit {

  docsForm;
  dto: InvestorPassportDto = new InvestorPassportDto();
  passportTypes: string[] = ['ID-картка', 'Паперовий паспорт'];


  constructor(private formBuilder: FormBuilder, private alertService: AlertService,
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
        itnNumber: ['', [Validators.required]],
      });
    }

  ngOnInit(): void {
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
    this.dto.email = localStorage.getItem('email');
    this.dto.issuer = form.issuerRegion + ' МВ ' + form.issuerName + ' в ' + form.issuerLocationRegion + ' області';
    this.dto.issueDate = JSON.stringify(form.issueDate).replace('Z', '').replace('"', '').replace('"', '').replace('T', ' ');
    this.dto.itnNumber = form.itnNumber;

    this.userService.saveInvestorPassportAndItn(this.dto).subscribe(data => {
      this.alertService.successMessage('Реєстрація успішно завершена!', 'Супер');
      this.router.navigateByUrl('investor-cabinet');
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });
  }

}
