import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Benefit } from 'src/app/models/benefit';
import { Company } from 'src/app/models/company';
import { Technology } from 'src/app/models/technology';
import { CompanyService } from 'src/app/services/company/company.service';
import { BenefitsComponent } from '../benefits/benefits.component';
import { TechnologiesComponent } from '../technologies/technologies.component';

const addCompanyLogoApi = 'http://localhost:8080/api/company/profile/add/logo'
const addCompanyBackgroundApi = 'http://localhost:8080/api/company/profile/add/background'


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {

  modalRef: BsModalRef
  companyTechnologies: Technology[];
  companyBenefits: Benefit[];
  formInformation: FormGroup;
  company: Company
  companyName: string;
  errorMessage: any;
  formLogo: FormGroup;
  companyLogo: any
  formVideo:FormGroup

  constructor(private modalService: BsModalService, private fb: FormBuilder, private companyService: CompanyService,
    private toastr: ToastrService, private http: HttpClient) {
      this.companyBenefits = new Array<Benefit>()
      this.companyTechnologies = new Array<Technology>()
   }

  ngOnInit(): void {
    this.getCompanyName();
    this.getCompanyProfile()

    this.formInformation = this.fb.group({
      information: ['', Validators.nullValidator],
      technologies: ['', Validators.nullValidator],
      benefits: ['', Validators.nullValidator] 
    })

  }

  getCompanyProfile(){
    this.companyService.getCompanyProfileInfo().subscribe((data)=>{
      if(data['message'] != null){
        this.toastr.info(data['message'],"Съобщение")
      }else{
        setTimeout(()=>{
        this.company = data;
      },1000)
      }
    })
  }

  uploadCompanyInformation(){

    if(confirm('Сигурен ли сте, че искате да направите промените')){
    this.formInformation.controls['technologies'].setValue(this.companyTechnologies);
    this.formInformation.controls['benefits'].setValue(this.companyBenefits);
    this.companyService.uploadInformation(this.formInformation.value).subscribe((data) => {
      this.toastr.success(data['message'],"Съобщение")
      this.getCompanyProfile();
    });
  }
  }

  getCompanyName(){
   this.companyService.getCompanyName().subscribe((data)=>{
      this.companyName = data['name']
      this.companyLogo = data['logo']
    })
  }

  getCompanyInformation(){
    if(this.company?.information === null || this.company?.information === undefined){
      return false
    }
    return true
  }

  getCompanyTechnologies(){
    if(this.company?.technologies === null || this.company?.technologies === undefined){
      return false;
    }
     this.companyTechnologies = this.company?.technologies
     return true 
  }
  getCompanyBenefits(){
    if(this.company?.benefits === null || this.company?.benefits === undefined){
      return false;
    }
     this.companyBenefits = this.company?.benefits
    return true 
  }

onLogoSelect(event){
  if (event.target.files.length>0){
    const logo = event.target.files[0];
    this.formLogo.get('logo')?.setValue(logo);
  }
}

deleteCompanyLogo(){
  if(confirm('Сигурен ли сте, че искате да изтриете логото')){
  this.companyService.deleteCompanyLogo().subscribe({complete: () =>{
    this.getCompanyProfile();
  }})
  }
}
  openBenefitsModal(){
  
    const initialState = {
      selectedBenefits: this.companyBenefits
    };

    this.modalRef = this.modalService.show(BenefitsComponent, {initialState, class: 'modal-xl'});
    this.modalRef.content.event.subscribe(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.companyBenefits.push(res.data[i]);
      }
      console.log(this.companyBenefits)
    });
  
  }
  openTechnologiesModal(){

    const initialState = {
      selectedTechnologies: this.companyTechnologies
    };

    this.modalRef = this.modalService.show(TechnologiesComponent, {initialState, class: 'modal-lg'});
    this.modalRef.content.event.subscribe(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.companyTechnologies.push(res.data[i]);
      }
    });
   }
   deleteNewTech(index){
    for(let i = 0; i < this.companyTechnologies.length; i++) {
      if (this.companyTechnologies[i].id === index) {
          this.companyTechnologies.splice(i, 1);
          break;
      }
    }
   }
   deleteNewBenefit(index){
    for(let i = 0; i < this.companyBenefits.length; i++) {
      if (this.companyBenefits[i].id === index) {
          this.companyBenefits.splice(i, 1);
          break;
      }
    }
   }

   get f(){
    return this.formInformation.controls
  }

  get invalid(){
    return this.formInformation.invalid
  }
  get formLogoInvalid(){
    return this.formLogo.invalid
  }

}
