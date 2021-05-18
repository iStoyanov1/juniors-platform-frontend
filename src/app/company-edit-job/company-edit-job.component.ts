import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { TechnologiesComponent } from '../company/technologies/technologies.component';
import { CompanyJobView } from '../models/company-job-view';
import { Technology } from '../models/technology';
import { JobService } from '../services/job/job.service';

@Component({
  selector: 'app-company-edit-job',
  templateUrl: './company-edit-job.component.html',
  styleUrls: ['./company-edit-job.component.css']
})
export class CompanyEditJobComponent implements OnInit {


  companyJobView: CompanyJobView

  jobOfferTechnologies: any;
  modalRef: BsModalRef

  form: FormGroup;

  constructor(private jobService: JobService, private route: ActivatedRoute, private fb:FormBuilder, 
    private modalService: BsModalService, private toastr: ToastrService, private router: Router) {

      this.jobOfferTechnologies = new Array<Technology>()


     }

  ngOnInit(): void {

    this.getCompanyJob()
    this.form = this.fb.group({
      title:['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      category:['',Validators.required],
      remoteInterview:[true,Validators.required],
      city:['', Validators.required],
      workingTime:['',Validators.required],
      technologies: ['', Validators.nullValidator],
      description:['',[Validators.required, Validators.minLength(10), Validators.maxLength(5000)]],
      salary:['', Validators.nullValidator]
    })
  }


  getCompanyJob(){
    setTimeout(()=>{
    this.route.params.subscribe(data =>{
      const id = data['id']
      this.jobService.getCompanyJobView(id).subscribe((data =>{
          this.companyJobView = data;
          this.jobOfferTechnologies = this.companyJobView.technologies
      }))
    })
  },1000)
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

   editJob(){
    this.form.controls['technologies'].setValue(this.jobOfferTechnologies);
    const id = this.route.snapshot.paramMap.get('id');
    this.jobService.editCompanyJob(id, this.form.value).subscribe((data)=>{
        this.toastr.success(data['message'])
    setTimeout(()=>{
      this.router.navigate(['/company/profile'])
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
