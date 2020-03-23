import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BorrowerRegData } from '../model/BorrowerRegData';
import { BorrowerDocsData } from '../model/BorrowerDocsData';

@Injectable({
  providedIn: 'root'
})
export class PrevDataService {

  constructor(private http: HttpClient) { }

  getBorrowerRegInputData(): Observable<BorrowerRegData> {
    const headers = this.getTokenHeader();
    return this.http.get<BorrowerRegData>('http://localhost:8080/GrowIt/borrower/reg-data', { headers })
    .pipe(catchError(this.errorHandler));
  }


  getBorrowerDocsInputData(): Observable<BorrowerDocsData> {
    const headers = this.getTokenHeader();
    return this.http.get<BorrowerDocsData>('http://localhost:8080/GrowIt/borrower/docs-data', { headers })
    .pipe(catchError(this.errorHandler));
  }









  errorHandler(error: HttpErrorResponse) {
    return throwError( error || 'Server error' );
  }

  private getTokenHeader() {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      return headers = headers.append('authorization', 'Bearer ' + token);
    }
  }
}
