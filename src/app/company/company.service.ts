import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Benefit } from './benefits/benefit';
import { Company } from './company';
import { Technology } from './technologies/technology';


const createCompany = 'http://localhost:8080/api/register/company'

const uploadCompanyinfo = 'http://localhost:8080/api/company/profile/upload/information'

const companyProfileView = 'http://localhost:8080/api/company/profile/information'

const companyName = 'http://localhost:8080/api/company/name'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  createCompany(data){
    return this.http.post(createCompany, data);
  }

  uploadInformation(data){
    return this.http.post(uploadCompanyinfo, data)
  }
  getCompanyProfileInfo() : Observable<Company>{
    return this.http.get<Company>(companyProfileView)
  }
  getCompanyName() : Observable<any>{
    return this.http.get<string>(companyName);
  }
}
