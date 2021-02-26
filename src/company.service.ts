import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const createCompany = 'http://localhost:8080/api/register/company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  createCompany(data){
    return this.http.post(createCompany, data);
  }
}
