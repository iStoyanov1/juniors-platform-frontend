import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TechnologiesComponent } from 'src/app/company/technologies/technologies.component';
import { Technology } from 'src/app/company/technologies/technology';


@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {
  jobOfferTechnologies: any;
  modalRef: BsModalRef

  form: FormGroup

  constructor(private modalService: BsModalService, private fb: FormBuilder) { 

    this.jobOfferTechnologies = new Array<Technology>()

  }

  ngOnInit(): void {

    this.form = this.fb.group({
      title:['', Validators.nullValidator],

    })

  }

  openTechnologiesModal(){

    const initialState = {
      selectedTechnologies: this.jobOfferTechnologies
    };

    this.modalRef = this.modalService.show(TechnologiesComponent, {initialState, class: 'modal-lg'});
    this.modalRef.content.event.subscribe(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.jobOfferTechnologies.push(res.data[i]);
      }
    });
   }
   deleteNewTech(index){
    for(let i = 0; i < this.jobOfferTechnologies.length; i++) {
      if (this.jobOfferTechnologies[i].id === index) {
          this.jobOfferTechnologies.splice(i, 1);
          break;
      }
    }
   }
}
