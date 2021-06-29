import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs';
import { LastJobs } from '../models/last-jobs';
import { TopCompanies } from '../models/top-companies';
import { AuthService } from '../services/auth/auth.service';
import { HomeService } from '../services/home/home.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  lastJobs: any[]
  companyLogo:any
  companyId:any
  topCompanies: any[]
  constructor(private homeService: HomeService, private authService: AuthService) {
   }

  ngOnInit(): void {

    $(document).ready(function () {

      $('.counter').each(function () {
          $(this).prop('Counter', 0).animate({
              Counter: $(this).text()
          }, {
              duration: 4000,
              easing: 'swing',
              step: function (now) {
                  $(this).text(Math.ceil(now));
              }
          });
      });
  });
  this.getLastJobOffers()
  this.getTopCompanies()
}
   getLastJobOffers(){
    setTimeout(()=>{
     this.homeService.getLastJobs().subscribe((data)=>{
     this.lastJobs = data;
    })
    },1000)
  }

  getTopCompanies(){
    setTimeout(() =>{
      this.homeService.getTopCompanies().subscribe((data)=>{
        this.topCompanies = data
      })
    }, 1000)
  }

  get isAuthenticated(){
    return this.authService.isAuthenticated();
  }
}
