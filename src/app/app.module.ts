import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk'; registerLocaleData(localeUk);
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Ng5SliderModule } from 'ng5-slider';
import { LoginComponent } from './components/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { DateRangePickerModule} from '@uiowa/date-range-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationComponent } from './components/registration/registration.component';
import { InvestorCabinetComponent } from './components/investor-cabinet/investor-cabinet.component';
import { BorrowerCabinetComponent } from './components/borrower-cabinet/borrower-cabinet.component';
import { AddressFillComponent } from './components/registration/borrower/address-fill/address-fill.component';
import { InvestorRegComponent } from './components/registration/investor/investor-reg/investor-reg.component';
import { InvestorPassportFillComponent } from './components/registration/investor/investor-passport-fill/investor-passport-fill.component';
import { BorrowerRegComponent } from './components/registration/borrower/borrower-reg/borrower-reg.component';
import { BorrowerPassportFillComponent } from './components/registration/borrower/borrower-passport-fill/borrower-passport-fill.component';
import { EmploymentFillComponent } from './components/registration/borrower/employment-fill/employment-fill.component';
import { EducationFillComponent } from './components/registration/borrower/education-fill/education-fill.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { AssetsFillComponent } from './components/registration/borrower/assets-fill/assets-fill.component';
import { MomentUtcDateAdapter } from './services/moment-utc-date-adapter';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FooterComponent } from './components/footer/footer.component';
import { InvestorDocumentSignComponent } from './components/investor-document-sign/investor-document-sign.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    InvestorRegComponent,
    InvestorCabinetComponent,
    InvestorPassportFillComponent,
    BorrowerRegComponent,
    BorrowerPassportFillComponent,
    BorrowerCabinetComponent,
    AddressFillComponent,
    EmploymentFillComponent,
    EducationFillComponent,
    LoanCalculatorComponent,
    AssetsFillComponent,
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    InvestorDocumentSignComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatSortModule,
    Ng5SliderModule,
    BrowserModule,
    NgbModule,
    DateRangePickerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot( {
        closeButton: true,
        disableTimeOut: true,
        maxOpened: 3,
        progressBar: true,
        newestOnTop: true,
        autoDismiss: true,
        countDuplicates: true,
        preventDuplicates: true }),
    BrowserModule,
    NgxPaginationModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'uk' },
    { provide: MAT_DATE_LOCALE, useValue: 'uk' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
