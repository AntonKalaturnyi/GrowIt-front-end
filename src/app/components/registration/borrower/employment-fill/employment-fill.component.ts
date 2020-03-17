import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employment-fill',
  templateUrl: './employment-fill.component.html',
  styleUrls: ['./employment-fill.component.scss']
})
export class EmploymentFillComponent implements OnInit {

  dataForm;
  socialStatuses: string[] = [
    'Повна зайнятість', 'Часткова зайнятість',
    'Підприємець', 'Студент',
    'Пенсіонер', 'Зайнятий пенсіонер',
    'Тимчасово не працюю', 'Робота за кордоном/сезонна',
    'Самозайнята особа', 'Декрента відпустка'];

  workSpheres: string[] = [
    'Автосервіс / Транспорт / Логістика', 'Аудит / Юр. сфера / Консалтинг',
    'Будівництво / Архітектура', 'Важка промисловість',
    'Готелі / Ресторани / Казино', 'Оптова торгівля / Склади',
    'Державне / Місцеве управління', 'Енергетика / Нафта / Газ',
    'Збройні сили', 'IT / Телекомунікації',
    'Легка промисловість', 'Медицина / Фармакологія (державна)',
    'Медицина / Фармакологія (комерційна)', 'Медіа / Видавництво / Поліграфія',
    'Поліція / Безпека / Правоохоронні органи', 'Наука',
    'Нерухомість', 'Освіта / Культура',
    'Реклама / Маркетинг / Продажі', 'Розваги / Шоу-бізнес',
    'Роздрібна торгівля', 'Сільське господарство',
    'Туризм / Спорт / Догляд за здоров\'ям', 'Фінанси / Банківська справа / Страхування',
    'Хімічна промисловість'];

  frequencies: string[] = [
    'Раз у тиждень', 'Раз у 2 тижні',
    'Раз у 3 тижні', 'Раз у місяць',
    'Рідше разу в місяць'];

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
    private userService: UserService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      socialStatus: ['', [Validators.required]],
      workSphere: ['', [Validators.required]],
      lengthOfTotalEmploymentMo: ['', [Validators.required]],
      lengthOfCurrentEmploymentMo: ['', [Validators.required]],
      employerCount: ['', [Validators.required]],
      monthlyIncomeOfficial: ['', [Validators.required]],
      monthlyIncomeAdditional: ['', [Validators.required]],
      nextPaymentDate: ['', [Validators.required]],
      paymentFrequency: ['', [Validators.required]],
      monthlyExpenses: ['', [Validators.required]],
      monthlyObligations: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  submit(form) {
    // console.log('socialStatus: ' + form.socialStatus);
    // console.log('workSphere: ' + form.workSphere);
    // console.log('totalExperienceMo: ' + form.totalExperienceMo);
    // console.log('currentJobExperienceMo: ' + form.currentJobExperienceMo);
    // console.log('employerCount: ' + form.employerCount);
    // console.log('monthlyIncomeOfficial: ' + form.monthlyIncomeOfficial);
    // console.log('monthlyIncomeAdditional: ' + form.monthlyIncomeAdditional);
    // console.log('nextPaymentDate: ' + form.nextPaymentDate);
    // console.log('paymentFrequency: ' + form.paymentFrequency);
    // console.log('monthlyExpenses: ' + form.monthlyExpenses);
    // console.log('monthlyObligations: ' + form.monthlyObligations);
    form.nextPaymentDate = JSON.stringify(form.nextPaymentDate).replace('Z', '').replace('"', '').replace('"', '').replace('T', ' ');
    this.userService.saveBorrowerEmployment(form).subscribe(data => {
      this.alertService.successMessage('Залишилось лише 2 кроки!', 'Супер');
      this.router.navigateByUrl('borrower/fill-education');
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });

  }

}
