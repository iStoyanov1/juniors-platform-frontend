import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyJobView } from 'src/app/models/company-job-view';
import { CompanyJob } from 'src/app/models/company-jobs';
import { JobOfferView } from 'src/app/models/job-offer-view';



const addJobOffer = 'http://localhost:8080/api/company/add/job'
const companyJobs = 'http://localhost:8080/api/company/jobs'
const deleteJob = 'http://localhost:8080/api/company/delete/job'
const companyJobOfferEditView = 'http://localhost:8080/api/company/edit/job'
const companyEditJob = 'http://localhost:8080/api/company/edit/job'
const jobOfferView = 'http://localhost:8080/api/job/view'
const allJobs = 'http://localhost:8080/api/jobs/all'
const jobsByTitle = 'http://localhost:8080/api/jobs/all'

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
    return this.http.get<CompanyJobView>(`${companyJobOfferEditView}/${id}`)
  }

  editCompanyJob(id:any, data){
    return this.http.post(`${companyEditJob}/${id}`, data)
  }
  jobOfferView(id:any): Observable<JobOfferView>{
    return this.http.get<JobOfferView>(`${jobOfferView}/${id}`)
  }

  getAllJobs(page:any, query:any): Observable<JobOfferView>{
     const params = new HttpParams()
   .set('query', query)
   .set('page', page);
    return this.http.get<JobOfferView>(allJobs, {params})

  }
  getJobsByTitle(page:any, title:any): Observable<JobOfferView>{
    const params = new HttpParams()
   .set('query', title)
   .set('page', page);
    return this.http.get<JobOfferView>(jobsByTitle,{params})
  }
}
