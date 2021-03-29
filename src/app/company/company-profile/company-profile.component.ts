import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Benefit } from '../benefits/benefit';
import { BenefitsComponent } from '../benefits/benefits.component';
import { BenefitsService } from '../benefits/benefits.service';
import { TechnologiesComponent } from '../technologies/technologies.component';
import { TechnologiesService } from '../technologies/technologies.service';
import { Technology } from '../technologies/technology';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {

  technology$ : Observable<Array<Technology>>
  modalRef: BsModalRef
  selectedBenefits : Benefit[]
  selectedTechnologies : Technology[]

  constructor(private benefitsService: BenefitsService, private technologyService: TechnologiesService, 
    private modalService: BsModalService) {
   }


  ngOnInit(): void {
    this.getAllTechnologies();

  }

  getAllTechnologies(){
    this.technology$ = this.technologyService.getAllTechnologies();
  }

  openBenefitsModal(){
    this.modalRef = this.modalService.show(BenefitsComponent, {class: 'modal-xl'});
    this.selectedBenefits = this.modalRef.content['selectedBenefits']
  
  }
  openTechnologiesModal(){
    this.modalRef = this.modalService.show(TechnologiesComponent, {class: 'modal-lg'});
    this.selectedTechnologies = this.modalRef.content['selectedTechnologies']
  }
}
