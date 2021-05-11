import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyJob } from 'src/app/models/company-jobs';



const addJobOffer = 'http://localhost:8080/api/company/add/job'
const companyJobs = 'http://localhost:8080/api/company/jobs'

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  addJobOffer(data){
    return this.http.post(addJobOffer,data)
  }

  getCompanyJobs() : Observable<CompanyJob[]>{
    return this.http.get<Array<CompanyJob>>(companyJobs)
  }
}
