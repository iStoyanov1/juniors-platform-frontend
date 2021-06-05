import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LastJobs } from 'src/app/models/last-jobs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-favourite-jobs',
  templateUrl: './user-favourite-jobs.component.html',
  styleUrls: ['./user-favourite-jobs.component.css']
})
export class UserFavouriteJobsComponent implements OnInit {

  userFavJobs$: any;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getFavJobs()


  }
  getFavJobs(){
  this.userFavJobs$ = this.userService.getFavJobs()
  }
  removeFavJob(id:any){
    this.userService.removeFavJob(id).subscribe((data)=>{
      this.toastr.info(data['message'])
    })
  }
}
