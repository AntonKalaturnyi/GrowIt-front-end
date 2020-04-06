import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { Creds } from '../model/Creds';
import { Router } from '@angular/router';

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

  investorPermission(): boolean {
    if (localStorage.getItem('INVESTOR')) {
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
        creds.password = localStorage.getItem('password');
        this.userService.authUser(creds);
      }
    return headers = headers.append('authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }
}
