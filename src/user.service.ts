import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './app/User';


const createUser = "http://localhost:8080/api/register/user"
const userDetails = "http://localhost:8080/api/user/profile"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
   }

   createUser(data){
    return this.http.post(createUser, data);
   }

   getUserDetails() : Observable<User> {
     return this.http.get<User>(userDetails)
   }
}
