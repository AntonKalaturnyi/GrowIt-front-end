import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BorrowerEmploymentData } from 'src/app/model/BorrowerEmploymentData';
import { PrevDataService } from 'src/app/services/prev-data.service';

@Component({
  selector: 'app-employment-fill',
  templateUrl: './employment-fill.component.html',
  styleUrls: ['./employment-fill.component.scss']
})
export class EmploymentFillComponent implements OnInit {

  dataForm;
  emplData: BorrowerEmploymentData;
  socialStatuses: string[] = [
    'Повна зайнятість', 'Часткова зайнятість',
    'Підприємець', 'Студент', 'Зайнятий студент',
    'Пенсіонер', 'Зайнятий пенсіонер',
    'Тимчасово безробітний', 'Робота за кордоном/сезонна',
    'Самозайнята особа', 'Декрента відпустка'];

  workSpheres: string[] = [
    'Автосервіс / Транспорт / Логістика', 'Аудит / Юр. сфера / Консалтинг',
    'Будівництво / Архітектура', 'Важка промисловість / Машинобудування',
    'Готелі / Ресторани / Казино', 'Оптова торгівля / Склади',
    'Державне / Місцеве управління', 'Енергетика / Нафта / Газ',
    'Збройні сили / Оборонна промисловість', 'IT / Телекомунікації',
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

    unemployed: string[] = [
      'менше 1 місяця', '1-3 місяці',
      '3-6 місяців', 'більше 6 місяців'];

  sources: string[] = [
    'Фінансова (державна) допомога',
    'Інша робота (підробіток)',
    'Продаж цінних паперів',
    'Кредити, позики',
    'Орендний дохід',
    'Депозити, інші вклади',
    'Страхові виплати',
    'Гранти / державні програми',
    'Стипендія',
    'Підтримка родичів / близьких',

    'Інший дохід'];

    relations1: string[] = [
      'Начальник', 'Менеджер', 'Колега', 'Партнер'];

      relations2: string[] = [
        'Начальник', 'Менеджер', 'Колега', 'Родич', 'Друг'];



  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
    private userService: UserService, private dataService: PrevDataService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      socialStatus: ['', [Validators.required]],
      workSphere: [''],
      lengthOfTotalEmploymentMo: [''],
      lengthOfCurrentEmploymentMo: [''],
      termOfUnemployment: [''],
      employerCount: [''],
      monthlyIncomeOfficial: [''],
      monthlyIncomeAdditional: [''],
      additionalIncomeSource: [''],
      scholarship: [''],
      pension: [''],
      employeesCount: [''],
      nextPaymentDate: ['', [Validators.required]],
      paymentFrequency: ['', [Validators.required]],
      monthlyExpenses: ['', [Validators.required]],
      monthlyObligations: ['', [Validators.required]],
      contactPerson1phone:  ['', [Validators.required, Validators.pattern('^([5-9][0-9]\\d{7})$')]],
      contactPerson2phone:  ['', [Validators.required, Validators.pattern('^([5-9][0-9]\\d{7})$')]],
      contactPerson1Name: ['', [Validators.required]],
      contactPerson2Name: ['', [Validators.required]],
      relation1: ['', [Validators.required]],
      relation2: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.dataService.getBorrowerEmploymentData().subscribe(data => {
      this.emplData = data;
      if (data.socialStatus !== null) {
      this.dataForm.controls.socialStatus.setValue(this.emplData.socialStatus);
      this.dataForm.controls.workSphere.setValue(this.emplData.workSphere);
      this.dataForm.controls.lengthOfTotalEmploymentMo.setValue(this.emplData.lengthOfTotalEmploymentMo);
      this.dataForm.controls.lengthOfCurrentEmploymentMo.setValue(this.emplData.lengthOfCurrentEmploymentMo);
      this.dataForm.controls.employerCount.setValue(this.emplData.employerCount);
      this.dataForm.controls.monthlyIncomeOfficial.setValue(this.emplData.monthlyIncomeOfficial);
      this.dataForm.controls.monthlyIncomeAdditional.setValue(this.emplData.monthlyIncomeAdditional);
      this.dataForm.controls.additionalIncomeSource.setValue(this.emplData.additionalIncomeSource);
      this.dataForm.controls.scholarship.setValue(this.emplData.scholarship);
      this.dataForm.controls.pension.setValue(this.emplData.pension);
      this.dataForm.controls.employeesCount.setValue(this.emplData.employeesCount);
      this.dataForm.controls.nextPaymentDate.setValue(this.emplData.nextPaymentDate);
      this.dataForm.controls.paymentFrequency.setValue(this.emplData.paymentFrequency);
      this.dataForm.controls.monthlyExpenses.setValue(this.emplData.monthlyExpenses);
      this.dataForm.controls.monthlyObligations.setValue(this.emplData.monthlyObligations);
      this.dataForm.controls.contactPerson1phone.setValue(this.emplData.contactPerson1phone);
      this.dataForm.controls.contactPerson2phone.setValue(this.emplData.contactPerson2phone);
      this.dataForm.controls.contactPerson1Name.setValue(this.emplData.contactPerson1Name);
      this.dataForm.controls.contactPerson2Name.setValue(this.emplData.contactPerson2Name);
      this.dataForm.controls.relation1.setValue(this.emplData.relation1);
      this.dataForm.controls.relation2.setValue(this.emplData.relation2);
    }
    });
  }

  goBack() {
    this.router.navigateByUrl('borrower/fill-address');
  }

  submit(form) {
    form.nextPaymentDate = JSON.stringify(form.nextPaymentDate).replace('Z', '').replace('"', '').replace('"', '').replace('T', ' ');
    form.contactPerson1phone = '+380' + form.contactPerson1phone;
    form.contactPerson2phone = '+380' + form.contactPerson2phone;
    this.userService.saveBorrowerEmployment(form).subscribe(data => {
      this.dataService.updateFilledInfo();
      this.alertService.successMessage('Залишилось лише 2 кроки!', 'Супер');
      // this.dataService.moveToUnfilledPage();
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });

  }

}
