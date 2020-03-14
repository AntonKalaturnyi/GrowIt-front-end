import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InvestorRegComponent } from './components/registration/investor-reg/investor-reg.component';
import { InvestorCabinetComponent } from './components/investor-cabinet/investor-cabinet.component';
import { InvestorPassportFillComponent } from './components/registration/investor-passport-fill/investor-passport-fill.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'new-investor', component: InvestorRegComponent },
  { path: 'investor-cabinet', component: InvestorCabinetComponent },
  { path: 'fill-passport', component: InvestorPassportFillComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
