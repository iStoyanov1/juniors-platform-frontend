import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyJobView } from 'src/app/models/company-job-view';
import { CompanyJob } from 'src/app/models/company-jobs';



const addJobOffer = 'http://localhost:8080/api/company/add/job'
const companyJobs = 'http://localhost:8080/api/company/jobs'
const deleteJob = 'http://localhost:8080/api/company/delete/job'
const companyJobOfferView = 'http://localhost:8080/api/company/edit/job'
const companyEditJob = 'http://localhost:8080/api/company/edit/job'

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

  deleteJob(id:string){
    return this.http.delete(`${deleteJob}/${id}`)
  }

  getCompanyJobView(id:string) : Observable<CompanyJobView>{
    return this.http.get<CompanyJobView>(`${companyJobOfferView}/${id}`)
  }

  editCompanyJob(id:any, data){
    return this.http.post(`${companyEditJob}/${id}`, data)
  }
}
