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
      this.docsFilled = data.docsFilled;
      this.addressFilled = data.addressFilled;
      this.employmentFilled = data.employmentFilled;
      this.educationFilled = data.educationFilled;
      this.assetsFilled = data.assetsFilled;
    });
  }

  toCabinet() {
    sessionStorage.setItem('BORROWER_ON_CHECK', 'true');
    this.router.navigateByUrl('borrower-cabinet');
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
