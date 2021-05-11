import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CompanyAdministrativeContacts } from 'src/app/models/company-administrative-contacts';
import { CompanyContacts } from 'src/app/models/company-contacts';
import { CompanyAuthView } from 'src/app/models/company-credentials';

const createCompany = 'http://localhost:8080/api/register/company'
const uploadCompanyinfo = 'http://localhost:8080/api/company/profile/upload/information'
const companyProfileView = 'http://localhost:8080/api/company/profile/information'
const companyName = 'http://localhost:8080/api/company/name'
const deleteCompanyApi = 'http://localhost:8080/api/company/profile/delete/video'
const deleteCompanyLogoApi = 'http://localhost:8080/api/company/profile/delete/logo'
const deleteCompanyBackgroundApi = 'http://localhost:8080/api/company/profile/delete/background'
const addCompanyContacts = 'http://localhost:8080/api/company/profile/add/contacts'
const getCompanyContacts = 'http://localhost:8080/api/company/profile/contacts'
const getCompanyAdminstrativeContacts = 'http://localhost:8080/api/company/profile/administrative/contacts'
const editCompanyAdminstrativeContacts = 'http://localhost:8080/api/company/profile/administrative/contacts/edit'
const getCompanyAuthView = 'http://localhost:8080/api/company/profile/credentials'
const editCompanyEmail = 'http://localhost:8080/api/company/profile/credentials/edit/email'
const editCompanyPassword = 'http://localhost:8080/api/company/profile/credentials/edit/password'

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

  getAdministrativeContacts(): Observable<CompanyAdministrativeContacts>{
    return this.http.get<CompanyAdministrativeContacts>(getCompanyAdminstrativeContacts)
  }
  editAdministrativeContacts(data){
    return this.http.post(editCompanyAdminstrativeContacts, data)
  }

  getCompanyCredentails() : Observable<CompanyAuthView>{
    return this.http.get<CompanyAuthView>(getCompanyAuthView)
  }

  editCompanyPassword(data){
    return this.http.put(editCompanyPassword, data)
  }
  editCompanyEmail(email){
    return this.http.put(editCompanyEmail, email)
  }
}
