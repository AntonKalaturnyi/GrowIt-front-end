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
    if (localStorage.getItem('REGISTERED_USER')) {
      return true;
    } else {
    return false;
    }
  } 


  registeredInvestorPermission(): boolean {
    if (localStorage.getItem('REGISTERED_INVESTOR')) {
      return true;
    } else {
    return false;
    }
  }

  investorPermission(): boolean {
    if (localStorage.getItem('INVESTOR')) {
      return true;
    } else {
    return false;
    }
  }


  registeredBorrowerPermission(): boolean {
    if (localStorage.getItem('REGISTERED_BORROWER')) {
      return true;
    } else {
    return false;
    }
  }

  borrowerOnCheckPermission(): boolean {
    if (localStorage.getItem('BORROWER_ON_CHECK')) {
      return true;
    } else {
    return false;
    }
  }

  verifiedBorrowerPermission(): boolean {
    if (localStorage.getItem('VERIFIED_BORROWER')) {
      return true;
    } else {
    return false;
    }
  }

  emptyStorage(): boolean {
    if (  localStorage.length < 1) {
      return true;
    } else {
    return false;
    }
  }


  public getTokenHeader(): HttpHeaders {
    if (((Number.parseInt(localStorage.getItem('tokenReceivedAt')) + 3600000) - new Date().getTime()) < 0 ) {  // fix: when remove +3600000 it disturbs the request and red in console
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if ( ((Number.parseInt(localStorage.getItem('tokenReceivedAt')) + 3600000) - new Date().getTime()) <= 1800000 ) {
        const creds = new Creds();
        creds.username = localStorage.getItem('email');
        creds.password = CryptoJS.AES.decrypt(localStorage.getItem('password'), 'baf387t8ft83fvb83').toString(CryptoJS.enc.Utf8);
        this.userService.authUser(creds);
      }
    return headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }
}
