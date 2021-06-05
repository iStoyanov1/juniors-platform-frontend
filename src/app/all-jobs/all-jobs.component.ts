import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
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

  constructor(private jobService: JobService, private render: Renderer2) { 
    this.pages = new Array<number>()

  }

  ngOnInit(): void {
      
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
    this.jobService.getAllJobs(this.page).subscribe((data)=>{
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
}