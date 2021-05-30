import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOfferView } from '../models/job-offer-view';
import { JobService } from '../services/job/job.service';

@Component({
  selector: 'app-job-offer-view',
  templateUrl: './job-offer-view.component.html',
  styleUrls: ['./job-offer-view.component.css']
})
export class JobOfferViewComponent implements OnInit {


  jobOfferView: JobOfferView
  jobOfferTechnologies:any
  companyLogo:any
  companyName:string;
  workingTimeValue:any
  remoteInterview: string
  companyDescription:string
  companyId:string

  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getJobOfferView()
  }

  getJobOfferView(){
    setTimeout(()=>{
    this.route.params.subscribe(data =>{
      const id = data['id']
      this.jobService.jobOfferView(id).subscribe((data =>{
          this.jobOfferView = data;
          this.jobOfferTechnologies = this.jobOfferView.technologies
          this.companyLogo =  this.jobOfferView['company']['description']['logo']
          this.companyName = this.jobOfferView['company']['name'];
          this.companyDescription = this.jobOfferView['company']['description']['information'].substring(0,350)
          this.companyId = this.jobOfferView['company']['id']
      }))
    })
  },1000)
  }
  getWorkingTimeValue(){
    if(this.jobOfferView['workingTime'] === "FullTime"){
      this.workingTimeValue = "Пълно работно време"
    }else{
      this.workingTimeValue = "Непълно работно време"
    }
    return this.workingTimeValue
  }
  isRemoteInterview(){
    if(this.jobOfferView['remoteInterview'] === true){
      return true
    }
    return false
  }
  isHasSalary(){
    if(this.jobOfferView['salary'] !== 0){
      return true
    }
    return false
  }
}
