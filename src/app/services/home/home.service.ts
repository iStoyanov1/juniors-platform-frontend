import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LastJobs } from 'src/app/models/last-jobs';
import { TopCompanies } from 'src/app/models/top-companies';

const getLastJobs = 'http://localhost:8080/api/home/jobs'
const getTopCompanies = 'http://localhost:8080/api/home/companies'


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }


  getLastJobs() :Observable<LastJobs[]>{
    return this.http.get<LastJobs[]>(getLastJobs)
  }

  getTopCompanies():Observable<TopCompanies[]>{
    return this.http.get<TopCompanies[]>(getTopCompanies)
  }
}
