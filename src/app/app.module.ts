import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterCompanyComponent } from './company/register-company/register-company.component';
import { ModalModule } from 'ngx-bootstrap/modal'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserService } from 'src/user.service';
import { ResponseHandlerInterceptorService } from 'src/response-handler-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptorService } from 'src/jwt-interceptor.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyProfileComponent } from './company/company-profile/company-profile.component';
import { CommonModule } from '@angular/common';
import { BenefitsComponent } from './company/benefits/benefits.component';
import { TechnologiesComponent } from './company/technologies/technologies.component';




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

  ],
  providers: [UserService, 
    {provide: HTTP_INTERCEPTORS, useClass: ResponseHandlerInterceptorService, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi:true}
  ],
   
  bootstrap: [AppComponent]
})
export class AppModule { }
