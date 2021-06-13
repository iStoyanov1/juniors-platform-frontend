import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-applications-job',
  templateUrl: './user-applications-job.component.html',
  styleUrls: ['./user-applications-job.component.css']
})
export class UserApplicationsJobComponent implements OnInit {

  userApplicationJobs$: any

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getApplicationsJobs()
  }
  getApplicationsJobs(){
    this.userApplicationJobs$ = this.userService.getApplyJobs()
    }
}
