import { Component, OnInit } from '@angular/core';
import { PrevDataService } from 'src/app/services/prev-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-nav-panel',
  templateUrl: './reg-nav-panel.component.html',
  styleUrls: ['./reg-nav-panel.component.scss']
})
export class RegNavPanelComponent implements OnInit {

  constructor(private dataService: PrevDataService, private router: Router) { }
  personalFilled: boolean;
  docsFilled: boolean;
  addressFilled: boolean;
  employmentFilled: boolean;
  educationFilled: boolean;
  assetsFilled: boolean;

  ngOnInit(): void {
    this.dataService.getWhichSectionsFilledData().subscribe(data => {
      this.personalFilled = data.personalFilled;
      this.personalFilled ? sessionStorage.setItem('personalFilled', data.personalFilled.toString()) : console.log();
      this.docsFilled = data.docsFilled;
      this.docsFilled ? sessionStorage.setItem('docsFilled', data.personalFilled.toString()) : console.log();
      this.addressFilled = data.addressFilled;
      this.addressFilled ? sessionStorage.setItem('addressFilled', data.personalFilled.toString()) : console.log();
      this.employmentFilled = data.employmentFilled;
      this.employmentFilled ? sessionStorage.setItem('employmentFilled', data.personalFilled.toString()) : console.log();
      this.educationFilled = data.educationFilled;
      this.educationFilled ? sessionStorage.setItem('educationFilled', data.personalFilled.toString()) : console.log();
      this.assetsFilled = data.assetsFilled;
      this.assetsFilled ? sessionStorage.setItem('assetsFilled', data.personalFilled.toString()) : console.log();
    });
  }

  toCabinet() {
    sessionStorage.setItem('BORROWER_ON_CHECK', 'true');
    this.router.navigateByUrl('verification');
  }
}

export interface SectionsFilledData {
  personalFilled: boolean;
  docsFilled: boolean;
  addressFilled: boolean;
  employmentFilled: boolean;
  educationFilled: boolean;
  assetsFilled: boolean;
}
