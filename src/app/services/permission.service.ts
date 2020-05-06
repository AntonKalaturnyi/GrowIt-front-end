import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Creds } from '../model/Creds';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  registeredUserPermission(): boolean {
    if (sessionStorage.getItem('REGISTERED_USER')) {
      return true;
    } else {
    return false;
    }
  } 


  registeredInvestorPermission(): boolean {
    if (sessionStorage.getItem('REGISTERED_INVESTOR')) {
      return true;
    } else {
    return false;
    }
  }

  investorPermission(): boolean {
    if (sessionStorage.getItem('INVESTOR')) {
      return true;
    } else {
    return false;
    }
  }


  registeredBorrowerPermission(): boolean {
    if (sessionStorage.getItem('REGISTERED_BORROWER')) {
      return true;
    } else {
    return false;
    }
  }

  borrowerOnCheckPermission(): boolean {
    if (sessionStorage.getItem('BORROWER_ON_CHECK')) {
      return true;
    } else {
    return false;
    }
  }

  verifiedBorrowerPermission(): boolean {
    if (sessionStorage.getItem('VERIFIED_BORROWER')) {
      return true;
    } else {
    return false;
    }
  }

  emptyStorage(): boolean {
    if (  sessionStorage.length < 1) {
      return true;
    } else {
    return false;
    }
  }


  public getTokenHeader(): HttpHeaders {
    if (((Number.parseInt(sessionStorage.getItem('tokenReceivedAt')) + 3600000) - new Date().getTime()) < 0 ) {  // fix: when remove +3600000 it disturbs the request and red in console
      sessionStorage.clear();
      this.router.navigateByUrl('/login');
    }
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if ( ((Number.parseInt(sessionStorage.getItem('tokenReceivedAt')) + 3600000) - new Date().getTime()) <= 1800000 ) {
        const creds = new Creds();
        creds.username = sessionStorage.getItem('email');
        creds.password = CryptoJS.AES.decrypt(sessionStorage.getItem('password'), 'baf387t8ft83fvb83').toString(CryptoJS.enc.Utf8);
        this.userService.authUser(creds);
      }
    return headers = headers.append('authorization', 'Bearer ' + sessionStorage.getItem('token'));
  }

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }
}
