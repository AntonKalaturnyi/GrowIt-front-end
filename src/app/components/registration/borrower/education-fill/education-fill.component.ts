import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PrevDataService } from 'src/app/services/prev-data.service';
import { BorrowerEducationData } from 'src/app/model/BorrowerEducationData';

@Component({
  selector: 'app-education-fill',
  templateUrl: './education-fill.component.html',
  styleUrls: ['./education-fill.component.scss']
})
export class EducationFillComponent implements OnInit {

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder,
              private alertService: AlertService, private dataService: PrevDataService,
              private userService: UserService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      educationLevel: ['', [Validators.required]],
      educationField: ['']
    });
  }

  dataForm;
  eduData: BorrowerEducationData;

  levels: string[] = [
    'Неповна середня',
    'Середня',
    'Середньотехнічна/спеціальна',
    'Незакінчена вища',
    'Вища(бакалавр)',
    'Вища(магістр)',
    'Науковий ступінь',
    'Дві або більше вищих освіти'
  ];

  faculties: string[] = [
    'Архітектура і будівництво',
    'Економіка і підприємництво',
    'Право',
    'Точні науки',
    'Природничі науки',
    'Гуманітарні науки',
    'Технічні науки',
    'Інформаційні технології',
    'Харчова та легка промисловість',
    'Медицина',
    'Військова справа',
    'Менеджмент',
    'Журналістика',
    'Важка/видобувна промисловість',
    'Мистецтво'
  ];


  ngOnInit(): void {
    this.dataService.getBorrowerEducationData().subscribe(data => {
      this.eduData = data;
      if (data.educationLevel !== null) {
      this.dataForm.controls.educationLevel.setValue(this.eduData.educationLevel);
      this.dataForm.controls.educationField.setValue(this.eduData.educationField);
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('borrower/fill-employment');
  }

  submit(form) {
    this.userService.saveBorrowerEducation(form).subscribe(data => {
      this.dataService.updateFilledInfo();
      this.alertService.successMessage('Дані про освіту збережені!', 'Супер');
      // this.dataService.moveToUnfilledPage();
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });

  }

}
