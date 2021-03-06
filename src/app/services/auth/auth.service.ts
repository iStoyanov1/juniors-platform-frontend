import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


const auth = "http://localhost:8080/login"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(body){
    return this.http.post(auth,body)
  }

  getToken(){
      let token = localStorage.getItem('token');
      return token;
  }

  isAuthenticated(){
    if(localStorage.getItem('token') == null){
      return false;
    }
    return true;
  }
  isModerator(){
    if(localStorage.getItem('role') == 'ROLE_MODERATOR'){
      return true;
    }
    return false;
  }
  isUser(){
    if(localStorage.getItem('role') == 'ROLE_USER'){
      return true;
    }
    return false;
  }
  isCompany(){
    if(localStorage.getItem('role') == 'ROLE_COMPANY'){
      return true;
    }
    return false;
  }
  logout(){
    localStorage.clear();
  }
 
}
