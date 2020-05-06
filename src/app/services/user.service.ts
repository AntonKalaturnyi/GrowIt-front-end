import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Creds } from '../model/Creds';
import { InvestorPassportDto } from '../model/InvestorPassportDto';
import { PermissionService } from './permission.service';
import { AlertService } from './alert.service';
import { throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) { }

  errorMessage: string;

  public authUser(creds: Creds) {
    this.http.post<AuthResponse>('http://localhost:8080/GrowIt/auth/signin', creds).subscribe(data => {
        sessionStorage.setItem('token', data.token);
        data.roles.forEach(element => {
          console.log('ROLE: ' + element);
          sessionStorage.setItem(element, 'true');
        });
        sessionStorage.setItem('password', CryptoJS.AES.encrypt(creds.password, 'baf387t8ft83fvb83').toString() );
        sessionStorage.setItem('email', data.username);
        sessionStorage.setItem('tokenReceivedAt', new Date().getTime() + '');
        if (sessionStorage.getItem('BORROWER_ON_CHECK')) {
          this.router.navigateByUrl('borrower-cabinet');
        }
        if (sessionStorage.getItem('INVESTOR') || sessionStorage.getItem('REGISTERED_INVESTOR')) {
          this.router.navigateByUrl('investor-cabinet');
        }
        this.alertService.successMessage('Well done!', 'You have successfully logged in.');
      }, error => {
        sessionStorage.clear();
        this.errorMessage = error;
        this.alertService.timeoutError('Password or email is incorrect', 'Bad credantials', 4200);
      });
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

  saveBorrowerPassportAndItn(data: FormData) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/borrower/save-passport-itn', data, { headers })
      .pipe(catchError(this.errorHandler));
  }

  saveBorrowerAddress(dto) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/borrower/set-address', dto, { headers })
      .pipe(catchError(this.errorHandler));
  }

  saveBorrowerEmployment(dto) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/borrower/set-employment', dto, { headers })
      .pipe(catchError(this.errorHandler));
  }

  saveBorrowerEducation(dto) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/borrower/set-education', dto, { headers })
      .pipe(catchError(this.errorHandler));
  }

  saveBorrowerAssets(dto) {
    const headers = this.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/borrower/set-assets', dto, { headers })
      .pipe(catchError(this.errorHandler));
  }

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }

  public getTokenHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if ( ((Number.parseInt(sessionStorage.getItem('tokenReceivedAt')) + 3600000) - new Date().getTime()) <= 600000) {
        const creds = new Creds();
        creds.username = sessionStorage.getItem('email');
        creds.password = sessionStorage.getItem('password');
        this.authUser(creds);
      }
    return headers = headers.append('authorization', 'Bearer ' + sessionStorage.getItem('token'));
  }
}

export interface AuthResponse {
  roles: string[];
  username: string;
  token: string;
}


