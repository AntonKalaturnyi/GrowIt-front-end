import { PermissionService } from 'src/app/services/permission.service';
import { FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { Observable  } from 'rxjs/Observable';
import { of  } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { fromMatSort, sortRows } from './datasource-utils';
import { fromMatPaginator, paginateRows } from './datasource-utils';

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
  fulfillment: number;
  description: string;
}


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


  ngOnInit(): void {
    this.loanService.getDashboardLoans().subscribe(data => {
      this.dataSource = data;

      const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
      const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      const rows$ = of(this.dataSource);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
    });

  }

  divide(val1, val2) {
    return Math.round((Number(val1) / Number(val2)) * 100)  ;
  }

}
