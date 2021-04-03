import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Benefit } from '../benefits/benefit';
import { BenefitsComponent } from '../benefits/benefits.component';
import { BenefitsService } from '../benefits/benefits.service';
import { Company } from '../company';
import { CompanyService } from '../company.service';
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
  benefits : Benefit[]
  technologies : Technology[]
  formInformation: FormGroup;
  company: Company
  companyName: string;
  errorMessage: any;
  substringUrlPath: any;
  embedLink: string;
  companyTechnologies: Technology[];
  companyBenefits: Benefit[]
  correctUrl: any;

  constructor(private benefitsService: BenefitsService, private technologyService: TechnologiesService, 
    private modalService: BsModalService, private fb: FormBuilder, private companyService: CompanyService,
    private toastr: ToastrService, private sanitizer: DomSanitizer) {
      this.companyTechnologies = new Array<Technology>();
      this.companyBenefits = new Array<Benefit>();
   }


  ngOnInit(): void {
    this.getCompanyName();
    this.getCompanyProfile()
    this.formInformation = this.fb.group({
      information: ['', Validators.nullValidator],
    })

  }

  getCompanyProfile(){
    this.companyService.getCompanyProfileInfo().subscribe((data)=>{
      if(data['message'] != null){
        this.toastr.info(data['message'],"Съобщение")
      }else{
        this.company = data;
      }
    })
  }

  uploadCompanyInformation(){
    this.formInformation.controls['technologies'].setValue(this.technologies);

    this.formInformation.controls['benefits'].setValue(this.benefits);

    this.companyService.uploadInformation(this.formInformation.value).subscribe({complete: () => {
      this.getCompanyProfile();
      },
    });
  }

  getCompanyName(){
   this.companyService.getCompanyName().subscribe((data)=>{
      this.companyName = data['name'];
    })
  }

  getCompanyVideo(){
    if(this.company?.urlPath !== null){ 
      this.convertCompanyVideoLink();
      return true
    }else {
     return false
    } 
  }

  getCompanyInformation(){
    return this.company?.information !== null ? true : false
  }

  getCompanyTechnologies(){
    if(this.company?.technologies === null){
      return false;
    }
     this.companyTechnologies = this.company?.technologies
    return true 
  }
  getCompanyBenefits(){
    if(this.company?.benefits === null){
      return false;
    }
     this.companyBenefits = this.company?.benefits
    return true 
  }
  convertCompanyVideoLink(){
        this.substringUrlPath = this.company?.urlPath?.split('=')[1]
        this.embedLink = 'https://www.youtube.com/embed/' + this.substringUrlPath;
        this.correctUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.embedLink)
  }
  
  openBenefitsModal(){
    this.modalRef = this.modalService.show(BenefitsComponent, {class: 'modal-xl'});
    this.benefits = this.modalRef.content['selectedBenefits']
  
  }
  openTechnologiesModal(){
    this.modalRef = this.modalService.show(TechnologiesComponent, {class: 'modal-lg'});
    this.technologies = this.modalRef.content['selectedTechnologies']
    console.log(this.modalRef.content)
  }
}
