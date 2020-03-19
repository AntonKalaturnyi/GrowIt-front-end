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
      loanPurpose: ['', [Validators.required]]
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

  //  onRangeValueChange(event: any) {
  //    const value = event.value;
  //    this.range = value;
  //  }

  ngOnInit(): void {
  }


  change() {

  }

  submit(form) {
    this.loanService.saveCalculatorLoan(form).subscribe(data => {
      this.alertService.successMessage('Залишилось додати свою інформацію!', 'Супер');
      this.router.navigateByUrl('new-borrower');
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Помилка!');
    });

  }

}
