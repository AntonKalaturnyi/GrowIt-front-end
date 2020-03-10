import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  authUser(creds) {
    return this.http.post<any>('http://localhost:8080/GrowIt/auth/signin', creds)
      .pipe(catchError(this.errorHandler));
  }

  registerBorrower(creds) {
    return this.http.post('http://localhost:8080/GrowIt/register/new-borrower', creds)
     .pipe(catchError(this.errorHandler));
   }

   registerInvestor(creds) {
    return this.http.post('http://localhost:8080/GrowIt/register/new-investor', creds)
     .pipe(catchError(this.errorHandler));
   }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }
}
