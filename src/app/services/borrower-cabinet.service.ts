import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PermissionService } from './permission.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BorrowerCabinetService {

  constructor(private http: HttpClient, private permissionService: PermissionService) { }

  getData(): Observable<any> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/borrower-account/get-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  toggleVerification(): Observable<any> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<any>('http://localhost:8080/GrowIt/borrower-account/verification', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

}
