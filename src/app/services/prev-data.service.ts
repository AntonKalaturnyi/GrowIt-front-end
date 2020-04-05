import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BorrowerRegData } from '../model/BorrowerRegData';
import { BorrowerDocsData } from '../model/BorrowerDocsData';
import { BorrowerAddressData } from '../model/BorrowerAddressData';
import { BorrowerEmploymentData } from '../model/BorrowerEmploymentData';
import { BorrowerEducationData } from '../model/BorrowerEducationData';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root'
})
export class PrevDataService {

  constructor(private http: HttpClient, private permissionService: PermissionService) { }

  getBorrowerRegInputData(): Observable<BorrowerRegData> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<BorrowerRegData>('http://localhost:8080/GrowIt/borrower/reg-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }


  getBorrowerDocsInputData(): Observable<BorrowerDocsData> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<BorrowerDocsData>('http://localhost:8080/GrowIt/borrower/docs-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }


  getBorrowerAddressData(): Observable<BorrowerAddressData> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<BorrowerAddressData>('http://localhost:8080/GrowIt/borrower/address-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  getBorrowerEmploymentData(): Observable<BorrowerEmploymentData> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<BorrowerEmploymentData>('http://localhost:8080/GrowIt/borrower/employment-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  getBorrowerEducationData(): Observable<BorrowerEducationData> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<BorrowerEducationData>('http://localhost:8080/GrowIt/borrower/education-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }
}
