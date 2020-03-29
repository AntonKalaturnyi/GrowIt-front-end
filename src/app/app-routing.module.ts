import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InvestorRegComponent } from './components/registration/investor/investor-reg/investor-reg.component';
import { InvestorCabinetComponent } from './components/investor-cabinet/investor-cabinet.component';
import { InvestorPassportFillComponent } from './components/registration/investor/investor-passport-fill/investor-passport-fill.component';
import { BorrowerRegComponent } from './components/registration/borrower/borrower-reg/borrower-reg.component';
import { BorrowerPassportFillComponent } from './components/registration/borrower/borrower-passport-fill/borrower-passport-fill.component';
import { BorrowerCabinetComponent } from './components/borrower-cabinet/borrower-cabinet.component';
import { AddressFillComponent } from './components/registration/borrower/address-fill/address-fill.component';
import { EmploymentFillComponent } from './components/registration/borrower/employment-fill/employment-fill.component';
import { EducationFillComponent } from './components/registration/borrower/education-fill/education-fill.component';
import { LoanCalculatorComponent } from './components/loan-calculator/loan-calculator.component';
import { AssetsFillComponent } from './components/registration/borrower/assets-fill/assets-fill.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'new-investor', component: InvestorRegComponent },
  { path: 'new-borrower', component: BorrowerRegComponent },
  { path: 'investor-cabinet', component: InvestorCabinetComponent },
  { path: 'borrower-cabinet', component: BorrowerCabinetComponent },
  { path: 'investor/fill-passport', component: InvestorPassportFillComponent },
  { path: 'borrower/fill-passport', component: BorrowerPassportFillComponent },
  { path: 'borrower/fill-address', component: AddressFillComponent },
  { path: 'borrower/fill-employment', component: EmploymentFillComponent },
  { path: 'borrower/fill-education', component: EducationFillComponent },
  { path: 'new-loan/calculator', component: LoanCalculatorComponent },
  { path: 'borrower/fill-education', component: EducationFillComponent },
  { path: 'borrower/fill-assets', component: AssetsFillComponent },
  { path: 'dashboard', component: DashboardComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
