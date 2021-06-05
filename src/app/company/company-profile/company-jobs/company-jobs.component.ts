import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private jobService: JobService, private toastr: ToastrService) { 
  }

  ngOnInit(): void {
    this.getCompanyJobs()
  }


  getCompanyJobs(){
   this.companyJob$ = this.jobService.getCompanyJobs()
  }

  deleteJob(id){
    if(confirm('Сигурен ли сте, че искате да изтриете обявата')){
    this.jobService.deleteJob(id).subscribe((data)=>{
      this.toastr.info(data['message'],"Съобщение")
    })
  }
  }
}
