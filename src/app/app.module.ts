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
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { RegisterCompanyComponent } from './company/register-company/register-company.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { TechnologiesComponent } from './company/technologies/technologies.component';
import { BenefitsComponent } from './company/benefits/benefits.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { CompanyProfileContactsComponent } from './company/company-profile/company-profile-contacts/company-profile-contacts.component';
import { CompanyAdministrativeInfoComponent } from './company/company-profile/company-administrative-info/company-administrative-info.component';
import { CompanyCredentialsComponent } from './company/company-profile/company-credentials/company-credentials.component';
import { JobOfferComponent } from './job-offer/job-offer.component';
import { CompanyJobsComponent } from './company/company-profile/company-jobs/company-jobs.component';
import { CompanyEditJobComponent } from './company/company-edit-job/company-edit-job.component';
import { JobOfferViewComponent } from './job-offer-view/job-offer-view.component';
import { CompanyProfileViewComponent } from './company/company-profile-view/company-profile-view.component';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { UserFavouriteJobsComponent } from './user/user-favourite-jobs/user-favourite-jobs.component';
import { UserApplicationsJobComponent } from './user/user-applications-job/user-applications-job.component';
import { AllCompaniesComponent } from './all-companies/all-companies.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { ContactsComponent } from './contacts/contacts.component';







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
    CompanyEditJobComponent,
    JobOfferViewComponent,
    CompanyProfileViewComponent,
    AllJobsComponent,
    UserFavouriteJobsComponent,
    UserApplicationsJobComponent,
    AllCompaniesComponent,
    ForgotPasswordComponent,
    ContactsComponent
    
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
    BrowserAnimationsModule,
    AngularEditorModule,
    GeoapifyGeocoderAutocompleteModule.withConfig('c40b6885c70645ef8ec1a7c23f79c519')
  ],
  providers: [UserService, 
    {provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true},
  ],
  entryComponents: [TechnologiesComponent],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
