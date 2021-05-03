import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const addJobOffer = 'http://localhost:8080/api/company/add/job'

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  addJobOffer(data){
    return this.http.post(addJobOffer,data)
  }
}
