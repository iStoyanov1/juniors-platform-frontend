import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Benefit } from './benefit';
import { BenefitsService } from './benefits.service';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {

  benefit$ : Observable<Benefit[]>
  selectedBenefits : Benefit[]

  constructor(private benefitService: BenefitsService, private modalService: BsModalService) {

   }

  ngOnInit(): void {

    this.getAllBenefits();
    this.selectedBenefits = new Array<Benefit>();
  }

  getAllBenefits(){
    this.benefit$ = this.benefitService.getAllBenefits();
  }

  closeModal() {
    this.modalService.hide();
  }
  changeSelection(ev: any, benefit:Benefit){
      if(ev.target.checked){
          this.selectedBenefits.push(benefit)
      }else{
          this.selectedBenefits = this.selectedBenefits.filter(b=>b!=benefit)
      }
  }

  submitSelectedBenefits(){
    this.modalService.hide();
  }

}
