import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const createUser = "http://localhost:8080/api/register/user"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
   }

   createUser(data){
    return this.http.post(createUser, data);
   }
}
