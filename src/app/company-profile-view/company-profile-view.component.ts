import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Benefit } from '../models/benefit';
import { CompanyJobView } from '../models/company-job-view';
import { CompanyJob } from '../models/company-jobs';
import { CompanyProfile } from '../models/company-profile';
import { JobOfferView } from '../models/job-offer-view';
import { Technology } from '../models/technology';
import { CompanyService } from '../services/company/company.service';

@Component({
  selector: 'app-company-profile-view',
  templateUrl: './company-profile-view.component.html',
  styleUrls: ['./company-profile-view.component.css']
})
export class CompanyProfileViewComponent implements OnInit {

  companyProfile: CompanyProfile
  companyBackground: any;
  companyJobOffers: CompanyJob[]
  companyTechnologies:Technology[]
  companyBenefits: Benefit[]

  constructor(private route: ActivatedRoute, private companyService: CompanyService) {
    this.companyJobOffers = new Array<CompanyJob>()
   }

  ngOnInit(): void {

    this.route.params.subscribe(data =>{
      const id = data['id']
      this.companyService.companyProfile(id).subscribe((data =>{
        this.companyProfile = data
        this.companyJobOffers = this.companyProfile.jobOffers;
        this.companyTechnologies = this.companyProfile.description.technologies
        this.companyBenefits = this.companyProfile.description.benefits
        this.getCompanyLogo()
      }));
    })
  }  

  getCompanyBackground(){
    if(this.companyProfile['description']['information'] === null){
      return false
    }
    return true
  }
  getCompanyLogo(){
    for(let i = 0; i < this.companyJobOffers.length; i++){
      this.companyJobOffers[i].logo = this.companyProfile['description']['logo'];
    }
  }
}
