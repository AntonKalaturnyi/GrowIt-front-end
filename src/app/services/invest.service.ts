import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private http: HttpClient) { }

  submitInvestments(dto: any) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/invest/submit-investments', dto, { headers })
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
