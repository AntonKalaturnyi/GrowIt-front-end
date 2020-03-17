import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { DateRangePickerModule} from '@uiowa/date-range-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrationComponent } from './components/registration/registration.component';
import { MatRadioModule } from '@angular/material/radio';
import { InvestorRegComponent } from './components/registration/investor-reg/investor-reg.component';
import { InvestorCabinetComponent } from './components/investor-cabinet/investor-cabinet.component';
import { InvestorPassportFillComponent } from './components/registration/investor-passport-fill/investor-passport-fill.component';
import { BorrowerRegComponent } from './components/registration/borrower-reg/borrower-reg.component';
import { BorrowerPassportFillComponent } from './components/registration/borrower-passport-fill/borrower-passport-fill.component';
import { BorrowerCabinetComponent } from './components/borrower-cabinet/borrower-cabinet.component';


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
    BorrowerCabinetComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserModule,
    NgbModule,
    DateRangePickerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
    ToastrModule.forRoot(
      {
        closeButton: true,
        disableTimeOut: true,
        maxOpened: 6,
        progressBar: true,
        newestOnTop: true,
        autoDismiss: true,
        countDuplicates: true,
        preventDuplicates: true
      }
    ),
    MatTooltipModule,
    MatProgressSpinnerModule,
    BrowserModule,
    NgxPaginationModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
