import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Benefit } from './benefits/benefit';
import { Company } from './company';
import { CompanyContacts } from './company-contacts';
import { Technology } from './technologies/technology';

const createCompany = 'http://localhost:8080/api/register/company'
const uploadCompanyinfo = 'http://localhost:8080/api/company/profile/upload/information'
const companyProfileView = 'http://localhost:8080/api/company/profile/information'
const companyName = 'http://localhost:8080/api/company/name'
const deleteCompanyApi = 'http://localhost:8080/api/company/profile/delete/video'
const deleteCompanyLogoApi = 'http://localhost:8080/api/company/profile/delete/logo'
const deleteCompanyBackgroundApi = 'http://localhost:8080/api/company/profile/delete/background'
const addCompanyContacts = 'http://localhost:8080/api/company/profile/add/contacts'
const getCompanyContacts = 'http://localhost:8080/api/company/profile/contacts'

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

  deleteCompanyVideo(){
    return this.http.delete(deleteCompanyApi)
  }

  deleteCompanyLogo(){
    return this.http.delete(deleteCompanyLogoApi)
  }

  deleteCompanyBackground(){
    return this.http.delete(deleteCompanyBackgroundApi)
  }

  addCompanyContacts(data){
    return this.http.post(addCompanyContacts, data);
  }
  getCompanyContacts(): Observable<CompanyContacts>{
    return this.http.get<CompanyContacts>(getCompanyContacts);
  }
}
