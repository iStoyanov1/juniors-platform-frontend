import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Benefit } from '../benefits/benefit';
import { BenefitsService } from '../benefits/benefits.service';
import { TechnologiesService } from '../technologies/technologies.service';
import { Technology } from '../technologies/technology';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  benefit$: Observable<Array<Benefit>>
  technology$ : Observable<Array<Technology>>


  constructor(private benefitsService: BenefitsService, private technologyService: TechnologiesService) {
   }

  ngOnInit(): void {

    this.getAllBenefits();
    this.getAllTechnologies();
  }

  getAllBenefits(){
    this.benefit$ = this.benefitsService.getAllBenefits();
  }

  getAllTechnologies(){
    this.technology$ = this.technologyService.getAllTechnologies();
  }
}
