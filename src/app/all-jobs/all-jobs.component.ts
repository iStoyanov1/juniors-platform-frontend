import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../services/job/job.service';

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.css']
})
export class AllJobsComponent implements OnInit {

@ViewChildren('activePage') el;

page:number=0;
 jobs:any
 pages: Array<number>
 companyLogo:any
 jobsPerPage:number
 totalJobs:number;
 countJobs:number;
 query:any;
 formGroup: FormGroup
 formSalary:FormGroup

  constructor(private jobService: JobService, private render: Renderer2, private fb: FormBuilder) { 
    this.pages = new Array<number>()
    this.query = "";

  }

  ngOnInit(): void {
      
    this.formGroup = this.fb.group({
      query:['', Validators.nullValidator]
    })
    this.formSalary = this.fb.group({
      query: ['', Validators.nullValidator]
    })
    this.getAllJobs()
  
  }
  setPage(i, event:any){
    event.preventDefault();
    this.page = i;
    this.getAllJobs()
  }
  prevPage(){
    this.page = this.page - 1;
    this.getAllJobs()
  }
  nextPage(){
    this.page = this.page + 1;
    this.getAllJobs()  
  }
  getAllJobs(){
    this.jobService.getAllJobs(this.page,this.query).subscribe((data)=>{
      this.jobs = data['content']
      this.pages = new Array(data['totalPages'])
      this.jobsPerPage=data['numberOfElements']
      this.totalJobs = data['totalElements']
    })
  }
  prevPageButton(){
    return this.page + 1 > 1
  }
  nextPageButton(){
    return this.page + 1 === this.pages.length
  }
  firstPageButton(){
    this.page = 0;
    this.getAllJobs()
  }
  lastPageButton(){
    this.page = this.pages.length - 1;
    this.getAllJobs()
  }

  findBySalary(){
    console.log(this.formSalary.controls['query'].value);
    this.query = this.formSalary.controls['query'].value
    this.jobService.getAllJobs(this.page, this.query).subscribe((data)=>{
      this.jobs = data['content']
      this.pages = new Array(data['totalPages'])
      this.jobsPerPage=data['numberOfElements']
      this.totalJobs = data['totalElements']
    })
  }

  searchJobByTitle(){
    this.query = this.formGroup.controls['query'].value
    this.jobService.getAllJobs(this.page, this.query).subscribe((data)=>{
      this.jobs = data['content']
      this.pages = new Array(data['totalPages'])
      this.jobsPerPage=data['numberOfElements']
      this.totalJobs = data['totalElements']
    })
  }
}