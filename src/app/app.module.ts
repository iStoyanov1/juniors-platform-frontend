import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ResponseHandlerInterceptorService } from 'src/response-handler-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptorService } from 'src/jwt-interceptor.service';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user/user.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { RegisterCompanyComponent } from './company/register-company/register-company.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { TechnologiesComponent } from './company/technologies/technologies.component';
import { BenefitsComponent } from './company/benefits/benefits.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { CompanyProfileContactsComponent } from './company/company-profile/company-profile-contacts/company-profile-contacts.component';
import { CompanyAdministrativeInfoComponent } from './company/company-profile/company-administrative-info/company-administrative-info.component';
import { CompanyCredentialsComponent } from './company/company-profile/company-credentials/company-credentials.component';
import { JobOfferComponent } from './job-offer/job-offer.component';
import { CompanyJobsComponent } from './company/company-profile/company-jobs/company-jobs.component';





@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LandingComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    UserProfileComponent,
    CompanyProfileComponent,
    TechnologiesComponent,
    BenefitsComponent,
    LoaderSpinnerComponent,
    CompanyProfileContactsComponent,
    CompanyAdministrativeInfoComponent,
    CompanyCredentialsComponent,
    JobOfferComponent,
    CompanyJobsComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    BrowserAnimationsModule

  ],
  providers: [UserService, 
    {provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true},
  ],
  entryComponents: [TechnologiesComponent],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
