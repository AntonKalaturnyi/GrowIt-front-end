import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Creds } from '../model/Creds';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authUser(creds: Creds) {
    return this.http.post<any>('http://localhost:8080/GrowIt/auth/signin', creds)
      .pipe(catchError(this.errorHandler));
  }

  registerBorrower(creds: Creds) {
    return this.http.post('http://localhost:8080/GrowIt/register/new-borrower', creds)
     .pipe(catchError(this.errorHandler));
   }

   registerInvestor(creds: Creds) {
    return this.http.post('http://localhost:8080/GrowIt/register/new-investor', creds)
     .pipe(catchError(this.errorHandler));
   }

   getSmsCodeForUser(userId: string) {
    const headers = this.getTokenHeader();
    return this.http.get('http://localhost:8080/GrowIt/sms?id=' + userId, { headers })
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
