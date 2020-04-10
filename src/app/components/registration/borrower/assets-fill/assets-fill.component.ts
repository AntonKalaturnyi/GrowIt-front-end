import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { PrevDataService } from 'src/app/services/prev-data.service';

@Component({
  selector: 'app-assets-fill',
  templateUrl: './assets-fill.component.html',
  styleUrls: ['./assets-fill.component.scss']
})
export class AssetsFillComponent implements OnInit {

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private userService: UserService, private dataService: PrevDataService, private router: Router) {
    this.dataForm = this.formBuilder.group({
      flat: ['', [Validators.required]],
      hasHouse: ['', [Validators.required]],
      hasCar: ['', [Validators.required]],
      carAge: [''],
      wasAbroad: ['', [Validators.required]],
    });
  }

  dataForm;
  assetsData: AssetsDataDto;
  flats: string[] = ['Немає', 'Так, одна', 'Так, більше одної'];
  yesNoOptions: string[] = ['Так', 'Ні'];
  carAges: string[] = ['0-2 роки', '2-5 років', 'більше 5 років'];

  ngOnInit(): void {
    this.dataService.getBorrowerAssetsData().subscribe(data => {
      this.assetsData = data;
      if (data.flat !== null) {
        this.dataForm.controls.flat.setValue(this.assetsData.flat);
        this.dataForm.controls.hasHouse.setValue(this.assetsData.hasHouse ? 'Так' : 'Ні');
        this.dataForm.controls.hasCar.setValue(this.assetsData.hasCar ? 'Так' : 'Ні');
        this.dataForm.controls.carAge.setValue(this.assetsData.carAge);
        this.dataForm.controls.wasAbroad.setValue(this.assetsData.wasAbroad ? 'Так' : 'Ні');
      }
    });
  }

  goBack() {
    this.router.navigateByUrl('borrower/fill-education');
  }

  submit(form) {
    if (form.hasHouse === 'Так') {
      form.hasHouse = true;
    } else { form.hasHouse = false; }

    if (form.hasCar === 'Так') {
      form.hasCar = true;
    } else { form.hasCar = false; }

    if (form.wasAbroad === 'Так') {
      form.wasAbroad = true;
    } else { form.wasAbroad = false; }

    this.userService.saveBorrowerAssets(form).subscribe(data => {
      this.alertService.successMessage('Реєстрацію завершено!', 'Супер');
      this.router.navigateByUrl('new-borrower');
    }, error => {
      console.log(error);
      this.alertService.errorMessage(error.error.message, 'Invalid input');
    });
  }
}

export interface AssetsDataDto {
  flat: string;
  hasHouse: boolean;
  hasCar: boolean;
  carAge: string;
  wasAbroad: boolean;
}
