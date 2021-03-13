import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'
import {ToastrService} from 'ngx-toastr'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor{

  constructor(public toastr: ToastrService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(req).pipe(tap((success)=>{
      if(success instanceof HttpResponse){
        if(success.url?.endsWith('register/user') || success.url?.endsWith('register/company')){
          this.toastr.success('Влезте в своя профил от бутона "Вход"', 'Вашата регистрация беше успешна.');
        }
      }
    }),catchError((err)=>{
        if(err.status != 403 || err.status != 401){
         this.toastr.error(err.error.message,'Грешка')
        }
        throw err;
    }))
  }
}
