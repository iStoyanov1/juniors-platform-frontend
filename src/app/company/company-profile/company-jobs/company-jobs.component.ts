import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CompanyJob } from 'src/app/models/company-jobs';
import { JobService } from 'src/app/services/job/job.service';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.css']
})
export class CompanyJobsComponent implements OnInit {

  companyJob$: Observable<CompanyJob[]>

  constructor(private jobService: JobService) { 
  }

  ngOnInit(): void {
    this.getCompanyJobs()
  }


  getCompanyJobs(){
   this.companyJob$ = this.jobService.getCompanyJobs()
  }

  deleteJob(id){
    this.jobService.deleteJob(id).subscribe((data)=>{
      console.log(data)
    })
  }
}
