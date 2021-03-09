import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './app/User';
import {map} from 'rxjs/operators'



const createUser = "http://localhost:8080/api/register/user"
const userDetails = "http://localhost:8080/api/user/profile"
const uploadFile = "http://localhost:8080/api/user/profile/cv"
const downloadFile = "http://localhost:8080/api/user/profile/download"


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

   uploadFile(file: File){
    let formData: FormData = new FormData();
    formData.append('file', file);



    // const req = new HttpRequest('POST', uploadFile, {"file": file.file}, {
    //   responseType: 'text'
    // })
    console.log(file)
    console.log(file.name)
    return this.http.post(uploadFile,formData)
   }

   downloadPDF(): any {
    return this.http.get(downloadFile, { responseType: 'blob' as 'json' }).pipe(map(
    (res) => {
            return new Blob([res as BlobPart], { type: 'application/pdf' })
        }
    ));
}
}
