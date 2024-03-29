import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PermissionService } from './permission.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestorCabinetService {

  constructor(private http: HttpClient, private permissionService: PermissionService) { }

  getData(): Observable<any> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/investor-account/get-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  getInvestments(): any {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/investor-account/investments', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  getTransactions(): any {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/investor-account/transactions', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }
}
