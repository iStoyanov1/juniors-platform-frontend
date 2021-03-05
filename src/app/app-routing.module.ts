import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { RegisterCompanyComponent } from './auth/register-company/register-company.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component:LandingComponent},
  {path:'register/user', component:RegisterUserComponent},
  {path: 'register/company', component: RegisterCompanyComponent},
  {path: 'user/profile', component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
