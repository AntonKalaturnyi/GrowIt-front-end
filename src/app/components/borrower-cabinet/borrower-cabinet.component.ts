import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { BorrowerCabinetService } from 'src/app/services/borrower-cabinet.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Observable, of } from 'rxjs';
import { Sort, MatSort } from '@angular/material/sort';
import { fromMatSort, fromMatPaginator, sortRows, paginateRows } from '../dashboard/datasource-utils';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-borrower-cabinet',
  templateUrl: './borrower-cabinet.component.html',
  styleUrls: ['./borrower-cabinet.component.scss']
})
export class BorrowerCabinetComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private loanService: LoanService,
              private router: Router, public permissionService: PermissionService, private cabinetService: BorrowerCabinetService) { }

  availableBalance: number;
  dailyRate: number;
  rank: string;
  score: string;
  status: string;

  displayedRows$: Observable<PrevLoan[]>;
  totalRows$: Observable<number>;
  displayedColumns: string[] = ['status', 'amount', 'term', 'dailyLoanRate', 'rating', 'loanPurpose' , 'closeDate' , 'ratingChange'  ];
  items: PrevLoan[];



  ngOnInit(): void {
    this.cabinetService.getData().subscribe(data => {
      this.availableBalance = data.availableBalance;
      this.dailyRate = data.dailyRate;
      this.rank = data.rank;
      this.score = data.score;
      this.status = data.status;
    });

    this.loanService.getPreviousBorrowerLoans().subscribe(data => {
      this.items = data;
      this.items.forEach(element => {
        if (element.term.slice(-1) === 'd') {
          element.absoluteTerm = Number(element.term.substr(0, element.term.indexOf('d')));
          element.term = element.absoluteTerm + ' дн.';
        } else {
          element.absoluteTerm = Number(element.term.substr(0, element.term.indexOf('m'))) * 30;
          element.term = element.term.substr(0, element.term.indexOf('m')) + ' міс.';
        }
      });
      // const sortEvents$: Observable<Sort> = fromMatSort(this.sort);
      // const pageEvents$: Observable<PageEvent> = fromMatPaginator(this.paginator);
      const rows$ = of(this.items);
      this.totalRows$ = rows$.pipe(map(rows => rows.length));
      // this.displayedRows$ = rows$.pipe(sortRows(sortEvents$), paginateRows(pageEvents$));
    });
  }

}

export interface PrevLoan {
  status: string;
  amount: number;
  term: string;
  absoluteTerm: number;
  dailyLoanRate: number;
  rating: string;
  loanPurpose: string;
  closeDate: any;
  ratingChange: string;
}
