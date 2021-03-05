import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/user.service';
import { User } from '../User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUserDetails().subscribe((data)=>{
      this.user = data;
    });
  }

}
