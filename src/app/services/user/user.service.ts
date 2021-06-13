import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { LastJobs } from 'src/app/models/last-jobs';
import { User } from 'src/app/models/user';



const createUser = "http://localhost:8080/api/register/user"
const userDetails = "http://localhost:8080/api/user/profile"
const downloadFile = "http://localhost:8080/api/user/profile/preview"
const deleteFile = "http://localhost:8080/api/user/profile/deleteCV"
const editUserPassword = "http://localhost:8080/api/user/profile/edit/password"
const addFavJob = 'http://localhost:8080/api/user/add/favourite/job' 
const getFavJobs = 'http://localhost:8080/api/user/favourite/job'
const removeFavJob = 'http://localhost:8080/api/user/favourite/job/remove'
const applyJob = 'http://localhost:8080/api/user/job/apply'
const getApplyJobs = 'http://localhost:8080/api/user/applications/jobs'
const forgotPassword = 'http://localhost:8080/api/user/password/forgot'



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
  addFavJob(id){
    return this.http.post(addFavJob, id)
  }
  getFavJobs(): Observable<LastJobs[]>{
      return this.http.get<LastJobs[]>(getFavJobs)
  }
  removeFavJob(id){
    return this.http.delete(`${removeFavJob}/${id}`)
  }
  applyJob(id){
    return this.http.post(applyJob, id)
  }
  getApplyJobs(): Observable<LastJobs[]>{
    return this.http.get<LastJobs[]>(getApplyJobs)
  }
  userForgotPassword(data){
    return this.http.post(forgotPassword, data)
  }
}
