import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RegisterCompanyComponent } from './company/register-company/register-company.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { CompanyAdministrativeInfoComponent } from './company/company-profile/company-administrative-info/company-administrative-info.component';
import { CompanyCredentialsComponent } from './company/company-profile/company-credentials/company-credentials.component';
import { JobOfferComponent } from './job-offer/job-offer.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component:LandingComponent},
  {path:'register/user', component:RegisterUserComponent},
  {path: 'register/company', component: RegisterCompanyComponent},
  {path: 'user/profile', component:UserProfileComponent},
  {path: 'company/profile',component:CompanyProfileComponent},
  {path: 'company/profile/administrative/contacts', component:CompanyAdministrativeInfoComponent},
  {path: 'company/profile/credentials', component:CompanyCredentialsComponent},
  {path: 'company/add/job', component:JobOfferComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
