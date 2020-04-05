import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private http: HttpClient, private permissionService: PermissionService) { }

  submitInvestments(dto: any) {
    const headers = this.permissionService.getTokenHeader();
    return this.http.post('http://localhost:8080/GrowIt/invest/submit-investments', dto, { headers })
      .pipe(catchError(this.permissionService.errorHandler));
  }




}
