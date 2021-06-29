import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Technology } from 'src/app/models/technology';
import { JobService } from 'src/app/services/job/job.service';
import { TechnologiesComponent } from '../company/technologies/technologies.component';



@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.css']
})
export class JobOfferComponent implements OnInit {
  jobOfferTechnologies: any;
  modalRef: BsModalRef

  form: FormGroup

  constructor(private modalService: BsModalService, private fb: FormBuilder, private jobService: JobService, 
    private toastr: ToastrService, private route: Router) { 

    this.jobOfferTechnologies = new Array<Technology>()

  }

  ngOnInit(): void {

    this.form = this.fb.group({
      title:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      category:['',Validators.required],
      remoteInterview:[true,Validators.required],
      remoteWork:[true,Validators.required],
      city:['', Validators.required],
      workingTime:['',Validators.required],
      technologies: ['', Validators.nullValidator],
      description:['',[Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
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
        this.toastr.success(data['message'])
        this.form.reset()
    setTimeout(()=>{
      this.route.navigate(['/company/profile'])
    },2000)
  })
   }
   get f(){
     return this.form.controls
    
   }

   get invalid(){
     return (this.form.invalid || !(this.jobOfferTechnologies.length > 0)) 
   }
}
