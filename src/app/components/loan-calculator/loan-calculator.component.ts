import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-loan-calculator',
  templateUrl: './loan-calculator.component.html',
  styleUrls: ['./loan-calculator.component.scss']
})
export class LoanCalculatorComponent implements OnInit {



  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder,
              private alertService: AlertService, private loanService: LoanService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      period: ['', [Validators.required]],
      loanPurpose: ['', [Validators.required]],
      description: [''],
    });
  }

  purposes: string[] = [
    'Сервіс авто',
    'Ремонт помешкання',
    'Погашення іншого кредиту',
    'Оплата лікування',
    'Відпустка/поїздка',
    'Потреби бізнесу',
    'Купівля електроніки',
    'Святкування події',
    'Шопінг',
    'Оплата навчання',
    'Купівля подарунка',
    'Оплата рахунків/штрафів'];

  dataForm;
  periodInDays: boolean;
  loanPurpose: string;
  math = Math;
  value = 0;

  options1: Options = {
    floor: 1000,
    ceil: 7000,
    step: 100
  };

  optionsPeriod1: Options = {
    floor: 7,
    ceil: 31,
    step: 1
  };

returnDate: Date = new Date();


   onDateChange(numDays: number) {
    this.returnDate = new Date();
    this.returnDate.setDate(this.returnDate.getDate() + numDays);
   }

  ngOnInit(): void {
      this.loanService.getCalculatorLoan().subscribe(data => {
        this.dataForm.controls.amount.setValue(data.amount);
        this.dataForm.controls.period.setValue(data.period);
        this.dataForm.controls.loanPurpose.setValue(data.loanPurpose);
        if (this.permissionService.verifiedBorrowerPermission) {
        this.dataForm.controls.description.setValue(data.description);
            }
      });



  }


  change() {

  }

  submit(form) {
    this.loanService.saveCalculatorLoan(form).subscribe(data => {

      if (this.permissionService.verifiedBorrowerPermission()) {
        console.log('redirect!!!');
        this.alertService.successMessage('Кредит виставлений на дашборді, та збирає фінансування', 'Заявку на кредит створено!');
        this.router.navigateByUrl('borrower-cabinet');
      }

      if (sessionStorage.getItem('REGISTERED_BORROWER') && !sessionStorage.getItem('BORROWER_ON_CHECK')
      && !sessionStorage.getItem('VERIFIED_BORROWER')) {
        this.alertService.successMessage('Будь ласка, заповніть свою інформацію, щоб продовжити', 'Заявку на кредит створено!');
        this.router.navigateByUrl('new-borrower');
      }

      if (sessionStorage.getItem('BORROWER_ON_CHECK') && !sessionStorage.getItem('VERIFIED_BORROWER')) {
        this.alertService.successMessage('Будь ласка, дочекайтесь завершення верифікації, щоб продовжити', 'Заявку на кредит створено!');
        this.router.navigateByUrl('borrower-cabinet');
      }
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Помилка!');
    });

  }

}
