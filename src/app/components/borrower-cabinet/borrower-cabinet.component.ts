import { Component, OnInit, ViewChild } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { BorrowerCabinetService } from 'src/app/services/borrower-cabinet.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan.service';
import { Observable, of } from 'rxjs';
import { CountdownComponent } from 'ngx-countdown';
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
  @ViewChild('countdown') counter: CountdownComponent;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private formBuilder: FormBuilder, private loanService: LoanService,
    private router: Router, public permissionService: PermissionService, private cabinetService: BorrowerCabinetService) { }

  availableBalance: number;
  dailyRate: string;
  rank: string;
  score: string;
  status: string;
  verified: boolean;

  // displayedRows$: Observable<PrevLoan[]>;
  totalRows$: Observable<number>;
  displayedColumns: string[] = ['status', 'amount', 'term', 'dailyLoanRate', 'rating', 'loanPurpose', 'closeDate', 'ratingChange'];
  dataSource: CurrentLoanDto[];
  displayedRows$: Observable<CurrentLoanDto[]>;
  items: PrevLoan[];

  zeroTrigger(e) {
    if (e.action === 'done') {
      console.log('Gotcha!!!');
      this.cabinetService.toggleVerification().subscribe(data => {
        this.refresh();
      });
    }
  }

  refresh() {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/borrower-cabinet']);
    });
  }

  resume() {
    this.counter.resume();

  }

  pause() {
    this.counter.pause();
  }

  divide(val1, val2) {
    return Math.round((Number(val1) / Number(val2)) * 100);
  }

  deleteLoan() {
    this.loanService.deleteCabinetLoanOnFunding().subscribe(data => {
      console.log('Deleted: ' + data);
      this.refresh();
    });
  }

  ngOnInit(): void {
    this.cabinetService.getData().subscribe(data => {
      this.availableBalance = data.availableBalance;
      this.dailyRate = data.dailyRate;
      this.rank = data.rank;
      this.score = data.score;
      this.status = data.status;
      this.verified = data.verified;
      if (this.verified) {
        sessionStorage.setItem('VERIFIED_BORROWER', 'true');
      }

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

    this.loanService.getCabinetCurrentLoan().subscribe(data => {
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

export interface CurrentLoanDto {
  loanId: number;
  /*** Front loan data*/
  amount: number;
  term: string;
  absoluteTerm: number;
  amountToReturn: string;
  loanPurpose: string;
  applyDate: Date;
  deadline: string;
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
  clicked: boolean;
}
