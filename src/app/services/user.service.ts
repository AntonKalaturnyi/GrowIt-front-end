import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Creds } from '../model/Creds';
import { InvestorPassportDto } from '../model/InvestorPassportDto';
import { PermissionService } from './permission.service';
import { AlertService } from './alert.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private alertService: AlertService) { }

  errorMessage: string;

  public authUser(creds: Creds) {
    this.http.post<AuthResponse>('http://localhost:8080/GrowIt/auth/signin', creds).subscribe(data => {
        localStorage.setItem('token', data.token);
        data.roles.forEach(element => {
          console.log('ROLE: ' + element);
          localStorage.setItem(element, 'true');
        });
        localStorage.setItem('password', creds.password);
        localStorage.setItem('email', data.username);
        localStorage.setItem('tokenReceivedAt', new Date().getTime() + '');
        this.alertService.successMessage('Well done!', 'You have successfully logged in.');
      }, error => {
        localStorage.removeItem('password');
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('tokenReceivedAt');
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
    const token = localStorage.getItem('token');
    if ( ((Number.parseInt(localStorage.getItem('tokenReceivedAt')) + 3600000) - new Date().getTime()) <= 600000) {
        const creds = new Creds();
        creds.username = localStorage.getItem('email');
        creds.password = localStorage.getItem('password');
        this.authUser(creds);
      }
    return headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
  }
}

export interface AuthResponse {
  roles: string[];
  username: string;
  token: string;
}


