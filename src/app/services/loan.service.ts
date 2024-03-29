import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { BorrowerEmploymentData } from '../model/BorrowerEmploymentData';
import { DashboardLoanDto } from '../components/dashboard/dashboard.component';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient, private permissionService: PermissionService) { }

  saveCalculatorLoan(dto: any) {
    const headers = this.permissionService.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/loan/new-calculator-loan', dto, { headers })
      .pipe(catchError(this.permissionService.errorHandler));
  }

  getDashboardLoans(): any {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/loan/dashboard-loans', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  getCabinetCurrentLoan(): any {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/borrower-account/current-loan', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  deleteCabinetLoanOnFunding(): Observable<any> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.delete<any>('http://localhost:8080/GrowIt/borrower-account/delete-on-funding', {headers});
  }

  getPreviousBorrowerLoans(): any {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/borrower-account/get-loans', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  getCalculatorLoan(): Observable<any> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/loan/calculator-loan', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }
}
