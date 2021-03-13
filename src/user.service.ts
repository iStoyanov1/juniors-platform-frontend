import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { User } from './app/user'



const createUser = "http://localhost:8080/api/register/user"
const userDetails = "http://localhost:8080/api/user/profile"
const downloadFile = "http://localhost:8080/api/user/profile/preview"
const deleteFile = "http://localhost:8080/api/user/profile/deleteCV"
const editUserPassword = "http://localhost:8080/api/user/profile/edit/password"


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

   downloadPDF(): any {
    return this.http.get(downloadFile, { responseType: 'blob' as 'json' }).pipe(map(
    (res) => {
            return new Blob([res as BlobPart], { type: 'application/pdf' })
        }
    ));
  }
  
  deleteCV(){
    return this.http.delete(deleteFile);
  }

  userEditPassword(data){
      return this.http.put(editUserPassword, data);
  }
}
