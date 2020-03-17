import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InvestorRegComponent } from './components/registration/investor-reg/investor-reg.component';
import { InvestorCabinetComponent } from './components/investor-cabinet/investor-cabinet.component';
import { InvestorPassportFillComponent } from './components/registration/investor-passport-fill/investor-passport-fill.component';
import { BorrowerRegComponent } from './components/registration/borrower-reg/borrower-reg.component';
import { BorrowerPassportFillComponent } from './components/registration/borrower-passport-fill/borrower-passport-fill.component';
import { BorrowerCabinetComponent } from './components/borrower-cabinet/borrower-cabinet.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'new-investor', component: InvestorRegComponent },
  { path: 'new-borrower', component: BorrowerRegComponent }, // +
  { path: 'investor-cabinet', component: InvestorCabinetComponent }, // +
  { path: 'borrower-cabinet', component: BorrowerCabinetComponent }, // +
  { path: 'investor/fill-passport', component: InvestorPassportFillComponent }, // +
  { path: 'borrower/fill-passport', component: BorrowerPassportFillComponent } // +

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
