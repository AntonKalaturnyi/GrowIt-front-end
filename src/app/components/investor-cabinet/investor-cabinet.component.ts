import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { InvestorCabinetService } from 'src/app/services/investor-cabinet.service';
import { Sort, MatSort } from '@angular/material/sort';
import { fromMatSort, fromMatPaginator, sortRows, paginateRows } from '../dashboard/datasource-utils';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-investor-cabinet',
  templateUrl: './investor-cabinet.component.html',
  styleUrls: ['./investor-cabinet.component.scss']
})
export class InvestorCabinetComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public permissionService: PermissionService, public cabinetService: InvestorCabinetService) { }

  availableBalance: number;
  investedFunds: number;

  totalRows$: Observable<number>;
  dataSource: InvestmentDto[];
  transactions: TransactionDto[];

  displayedRows$: Observable<InvestmentDto[]>;
  displayedTransactions$: Observable<TransactionDto[]>;


  ngOnInit(): void {
    this.cabinetService.getData().subscribe(data => {
      this.availableBalance = data.availableBalance;
      this.investedFunds = data.investedFunds;
    });

    if(this.permissionService.investorPermission()) {
    this.cabinetService.getInvestments().subscribe(data => {
      this.dataSource = data;
      const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      const rows$ = of(this.dataSource);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
      data.forEach(element => {
        if (element.term.slice(-1) === 'd') {
          element.absoluteTerm = Number(element.term.substr(0, element.term.indexOf('d')));
          element.term = element.absoluteTerm + ' дн.';
        } else {
          element.absoluteTerm = Number(element.term.substr(0, element.term.indexOf('m'))) * 30;
          element.term = element.term.substr(0, element.term.indexOf('m')) + ' міс.';
        }
      });
    });

    this.cabinetService.getTransactions().subscribe(data => {
      this.transactions = data;
      const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      const transRows$ = of(this.transactions);
      this.totalRows$ = transRows$.pipe(map(rows => rows.length));
      this.displayedTransactions$ = transRows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
      this.displayedTransactions$ = transRows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));

    });
  }

  }

}
export interface TransactionDto {
  date: any;
  amount: number;
  commission: number;
  status: string;
  type: string;
  description: string;
  previousBalance: number;
}


export interface InvestmentDto {
  investmentId: number;
  /*** Front loan data*/
  absoluteTerm: number;
  fulfillment: number;
  amountFunded: number;
  amount: number;
  investedAmount: string;
  plannedReturn: string;
  term: string;
  interestRate: number;
  loanPurpose: string;
  deadline: string;
  dateInvested: any;
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
  clicked: boolean;
}
