import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';

export interface DashboardLoanDto {
  rank: string;
  score: number;
  amount: number;
  term: string;
  profitability: string;
  loanPurpose: string;
  applyDate: Date;
  timeLeft: number;
  amountFunded: number;
  description: string;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
              private loanService: LoanService, private router: Router) { }

  displayedColumns: string[] = ['rating', 'amount', 'term', 'profitability', 'loanPurpose', 'applyDate', 'timeLeft', 'amountFunded', 'button'];
  dataSource: DashboardLoanDto[];
  daysLeft;
  showInput = false;

  ngOnInit(): void {
    this.loanService.getDashboardLoans().subscribe(data => {
      this.dataSource = data;
      // this.dataSource.forEach(element => {
      //   element.daysLeft = moment(new Date().getTime()).diff(moment(element.applyDate.getTime()));
      // });
    });


  }

  divide(val1, val2) {
    return Math.round((Number(val1) / Number(val2)) * 100)  ;
  }

}
