import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Creds } from '../model/Creds';
import { InvestorPassportDto } from '../model/InvestorPassportDto';
import { BorrowerPassportDto } from '../model/BorrowerPassportDto';

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
    return this.http.post<any>('http://localhost:8080/GrowIt/register/new-borrower', creds)
     .pipe(catchError(this.errorHandler));
   }

   registerInvestor(creds: Creds) {
    return this.http.post<any>('http://localhost:8080/GrowIt/register/new-investor', creds)
     .pipe(catchError(this.errorHandler));
   }

   sendInvestorInfoAndGetSmsCode(dto) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/invest/fill-investor', dto, { headers })
    .pipe(catchError(this.errorHandler));
  }

  sendBorrowerInfoAndGetSmsCode(dto) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/borrower/fill-borrower', dto, { headers })
    .pipe(catchError(this.errorHandler));
  }

  saveInvestorPassportAndItn(dto: InvestorPassportDto) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/invest/investor-save-passport-itn', dto, { headers })
    .pipe(catchError(this.errorHandler));
  }

  saveBorrowerPassportAndItn(data: FormData  ) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/borrower/save-passport-itn', data, { headers })
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
