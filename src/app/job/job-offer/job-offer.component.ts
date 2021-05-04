import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TechnologiesComponent } from 'src/app/company/technologies/technologies.component';
import { Technology } from 'src/app/company/technologies/technology';
import { JobService } from '../job.service';


@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {
  jobOfferTechnologies: any;
  modalRef: BsModalRef

  form: FormGroup

  constructor(private modalService: BsModalService, private fb: FormBuilder, private jobService: JobService) { 

    this.jobOfferTechnologies = new Array<Technology>()

  }

  ngOnInit(): void {

    this.form = this.fb.group({
      title:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      category:['',Validators.required],
      remoteInterview:[true,Validators.required],
      city:['', Validators.required],
      workingTime:['',Validators.required],
      technologies: ['', Validators.required],
      description:['',[Validators.required, Validators.min(10), Validators.max(3000)]],
      salary:['', Validators.nullValidator]
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

   addJob(){
    this.form.controls['technologies'].setValue(this.jobOfferTechnologies);
    this.jobService.addJobOffer(this.form.value).subscribe((data)=>{
      console.log(data)
    })
   }
   get f(){
     return this.form.controls
    
   }

   get invalid(){
     return this.form.invalid
   }
}
