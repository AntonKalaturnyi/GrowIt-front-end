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
import { AssetsDataDto } from '../components/registration/borrower/assets-fill/assets-fill.component';
import { SectionsFilledData } from '../components/registration/borrower/reg-nav-panel/reg-nav-panel.component';

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

  getBorrowerAssetsData(): Observable<AssetsDataDto> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<AssetsDataDto>('http://localhost:8080/GrowIt/borrower/assets-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }

  getWhichSectionsFilledData(): Observable<SectionsFilledData> {
    const headers = this.permissionService.getTokenHeader();
    return this.http.get<SectionsFilledData>('http://localhost:8080/GrowIt/borrower/filled-sections-data', { headers })
    .pipe(catchError(this.permissionService.errorHandler));
  }
}
