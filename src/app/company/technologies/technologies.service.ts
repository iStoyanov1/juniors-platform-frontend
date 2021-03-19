import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technology } from './technology';


const getAllTechnologiesUrl = "http://localhost:8080/api/company/technologies"

@Injectable({
  providedIn: 'root'
})
export class TechnologiesService {

  constructor(private http: HttpClient) { }

  getAllTechnologies() : Observable<Technology[]>{
    return this.http.get<Technology[]>(getAllTechnologiesUrl)
  }

}
