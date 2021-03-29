import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Benefit } from './benefit';


const getAllBenefitsUrl = "http://localhost:8080/api/company/benefits"

//"http://localhost:8080/api/register/user"

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  constructor(private http: HttpClient) { }


  getAllBenefits() : Observable<Array<Benefit>>{
    return this.http.get<Array<Benefit>>(getAllBenefitsUrl);
  }
  
}
