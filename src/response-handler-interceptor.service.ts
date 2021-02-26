import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators'
import {ToastrService} from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerInterceptorService implements HttpInterceptor{

  constructor(public toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(req).pipe(tap((success)=>{
      if(success instanceof HttpResponse){
        if(success.url?.endsWith('register/user') || success.url?.endsWith('register/company')){
          this.toastr.success('Влезте в своя профил от бутона "Вход"', 'Вашата регистрация беше успешна.');
        }
      }
     
    }), catchError((err)=>{
       this.toastr.error(err.error.message,'Грешка')
       throw err;
    }))
  }
}
