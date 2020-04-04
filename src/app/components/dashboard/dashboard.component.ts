import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { fromMatSort, sortRows } from './datasource-utils';
import { fromMatPaginator, paginateRows } from './datasource-utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public permissionService: PermissionService, private formBuilder: FormBuilder, private alertService: AlertService,
    private loanService: LoanService, private router: Router) { }

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['rating', 'amount', 'term', 'profitability', 'loanPurpose', 'applyDate', 'timeLeft', 'amountFunded', 'button'];
  dataSource: DashboardLoanDto[];
  displayedRows$: Observable<DashboardLoanDto[]>;
  totalRows$: Observable<number>;
  summarizedInvestment: number = 0;


  ngOnInit(): void {
    this.loanService.getDashboardLoans().subscribe(data => {
      this.dataSource = data;
      data.forEach(element => {
        if (element.term.slice(-1) === 'd') {
          element.absoluteTerm = Number(element.term.substr(0, element.term.indexOf('d')));
          element.term = element.absoluteTerm + ' дн.';
        } else {
          element.absoluteTerm = Number(element.term.substr(0, element.term.indexOf('m'))) * 30;
          element.term = element.term.substr(0, element.term.indexOf('m')) + ' міс.';
        }
      });
      const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      const rows$ = of(this.dataSource);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
    });
  }

  toInt(val) {
    return parseInt(val);
  }

  divide(val1, val2) {
    return Math.round((Number(val1) / Number(val2)) * 100);
  }

  onInvestmentSelected(amount) {
    this.summarizedInvestment += +amount;
  }

  addToSelectedInvestments(amount: number) {
    this.summarizedInvestment += amount;
  }
}

export interface DashboardLoanDto {
  /*** Front loan data*/
  rank: string;
  score: number;
  amount: number;
  term: string;
  absoluteTerm: number;
  profitability: string;
  loanPurpose: string;
  applyDate: Date;
  timeLeft: number;
  amountFunded: number;
  fulfillment: number;
  description: string;
  /*** Expandable details*/
  /** Borrower data*/
  registrationDate: any;
  maritalStatus: string;
  kidsBefore18yo: number;
  kidsAfter18yo: number;
  placeOfLiving: string;
  /** Financial data*/
  age: number;
  socialStatus: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  pti: number;
  /** Credit history*/
  currentOpenCredits: number; // DTO
  currentDebtAmount: number;  // Сумма тек. задолженности
  hasDelayInCurrentPeriod: boolean; // Признак наличия просрочки в тек.периоде
  currentOverdueDebtAmount: number;  // Сумма тек. просроченной задолженности
  currentDelayInDays: number; // Текущее кол-во дней просрочки
  payedOffInOtherOrgs: number; // DTO
  payedInGrowit: number;
}

