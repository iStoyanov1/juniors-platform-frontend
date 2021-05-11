import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
    let token = this.authService.getToken();

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req).pipe(catchError((err: HttpErrorResponse)=>{
      if(err.status === 403 && this.authService.getToken() != null){
        localStorage.clear()
        this.toast.error("Вашата сесия е изтекла. Моля влезте отново в профила си.", "Грешка");
        this.router.navigateByUrl('/');
      }
      return throwError(err)
    }
    ))
  }
}
