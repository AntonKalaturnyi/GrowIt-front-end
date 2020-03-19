import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  saveCalculatorLoan(dto: any) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/loan/new-calculator-loan', dto, { headers })
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }

  private getTokenHeader() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      return headers = headers.append('authorization', 'Bearer ' + token);
    }
  }


}
