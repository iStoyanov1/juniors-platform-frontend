import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobOfferView } from '../models/job-offer-view';
import { AuthService } from '../services/auth/auth.service';
import { JobService } from '../services/job/job.service';
import { UserService } from '../services/user/user.service';

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
  jobId:any
  formFavJob:FormGroup
  formApplyJob:FormGroup
  isDeleted:Boolean

  constructor(private jobService: JobService, private route: ActivatedRoute, private authService: AuthService,
     private fb:FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.formFavJob = this.fb.group({
      id: ['', Validators.nullValidator]
    })
    this.formApplyJob = this.fb.group({
      id: ['', Validators.nullValidator]
    })

    this.getJobOfferView()
  }

  getJobOfferView(){
    setTimeout(()=>{
    this.route.params.subscribe(data =>{
      const id = data['id']
      this.jobService.jobOfferView(id).subscribe((data =>{
        console.log(data)
        this.jobId = id;
          this.jobOfferView = data;
          console.log(this.jobOfferView)
          this.jobOfferTechnologies = this.jobOfferView.technologies
          this.companyLogo =  this.jobOfferView['company']['logo']
          this.companyName = this.jobOfferView['company']['name'];
          this.companyDescription = this.jobOfferView['company']['description']['information'].substring(0,350)
          this.companyId = this.jobOfferView['company']['id']
          this.isDeleted = this.jobOfferView['isDeleted'];
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

  get userRole(){
    return this.authService.isUser()
  }

  addJobFav(){
    this.formFavJob.controls['id'].setValue(this.jobId)
    const formData = new FormData();
    formData.append('id', this.formFavJob.get('id')?.value);
    this.userService.addFavJob(formData).subscribe((data)=>{
      this.toastr.info(data['message']);
    })
  }
  applyJob(){
    this.formApplyJob.controls['id'].setValue(this.jobId)
    const formData = new FormData();
    formData.append('id', this.formApplyJob.get('id')?.value);
    this.userService.applyJob(formData).subscribe((data)=>{
      this.toastr.info(data['message'])
    })
  }
   isDeletedJob(){
    console.log(this.isDeleted)
    return this.isDeleted
  }
}
