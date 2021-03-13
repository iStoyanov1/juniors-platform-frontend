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
import { RegisterCompanyComponent } from './auth/register-company/register-company.component';
import { ModalModule } from 'ngx-bootstrap/modal'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserService } from 'src/user.service';
import { ResponseHandlerInterceptorService } from 'src/response-handler-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptorService } from 'src/jwt-interceptor.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    LandingComponent,
    LoginComponent,
    RegisterUserComponent,
    RegisterCompanyComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
