import { HttpClient } from '@angular/common/http';
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


const addCompanyLogoApi = 'http://localhost:8080/api/company/profile/add/logo'
const addCompanyBackgroundApi = 'http://localhost:8080/api/company/profile/add/background'


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css'],
})
export class CompanyProfileComponent implements OnInit {

  // technology$ : Observable<Array<Technology>>
  modalRef: BsModalRef
  benefits : Benefit[]
  technologies : Technology[]
  companyTechnologies: Technology[];
  companyBenefits: Benefit[]
  formInformation: FormGroup;
  company: Company
  companyName: string;
  errorMessage: any;
  substringUrlPath: any;
  embedLink: string;
  correctUrl: any;
  formLogo: FormGroup;
  companyLogo: any
  formBackground: FormGroup;
  companyBackground: any;

  constructor(private benefitsService: BenefitsService, private technologyService: TechnologiesService, 
    private modalService: BsModalService, private fb: FormBuilder, private companyService: CompanyService,
    private toastr: ToastrService, private sanitizer: DomSanitizer, private http: HttpClient) {
      this.companyTechnologies = new Array<Technology>();
      this.companyBenefits = new Array<Benefit>();
   }


  ngOnInit(): void {
    this.getCompanyName();
    this.getCompanyProfile()

    this.formLogo = this.fb.group({
      logo: ['', Validators.nullValidator]
    })

    this.formBackground = this.fb.group({
      background: ['', Validators.nullValidator]
    })

    this.formInformation = this.fb.group({
      information: ['', Validators.nullValidator],
      urlPath: ['', Validators.nullValidator],
      technologies: ['', Validators.nullValidator]
    })

  }

  getCompanyProfile(){
    setTimeout(()=>{
    this.companyService.getCompanyProfileInfo().subscribe((data)=>{
      if(data['message'] != null){
        this.toastr.info(data['message'],"Съобщение")
      }else{
        this.company = data;
      }
    })
    },1000)
  }

  uploadCompanyInformation(){

    this.addNewCompanyTechnologies();
    this.addNewCompanyBenefits();

    this.formInformation.controls['technologies'].setValue(this.companyTechnologies);
    this.formInformation.controls['urlPath'].setValue(this.company.urlPath);
    // this.formInformation.controls['benefits'].setValue(this.benefits);
    console.log(this.formInformation.controls)
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
  
deleteCompanyVideo(){
  this.companyService.deleteCompanyVideo().subscribe({complete: ()=>{
    this.getCompanyProfile()}
  });
}

onLogoSelect(event){
  if (event.target.files.length>0){
    const logo = event.target.files[0];
    this.formLogo.get('logo')?.setValue(logo);
  }
}

onBackgroundSelect(event){
  if (event.target.files.length>0){
    const background = event.target.files[0];
    this.formBackground.get('background')?.setValue(background);
  }
}

addCompanyBackground(){
  const formData = new FormData();
  formData.append('background', this.formBackground.get('background')?.value);

  this.http.post<any>(addCompanyBackgroundApi, formData).subscribe({complete: () => {
    this.getCompanyProfile();
  },
});   
}

addCompanyLogo(){
  const formData = new FormData();
  formData.append('logo', this.formLogo.get('logo')?.value);

  this.http.post<any>(addCompanyLogoApi, formData).subscribe({complete: () => {
    this.getCompanyProfile();
  },
});   
}

getCompanyLogo(){
  if(this.company['logo'] === null){
    return false
  }
  this.companyLogo = this.company?.logo
  return true
}

getCompanyBackground(){
  if(this.company['background'] === null){
    return false
  }
  this.companyBackground = this.company?.background
  return true
}

deleteCompanyLogo(){
  this.companyService.deleteCompanyLogo().subscribe({complete: () =>{
    this.getCompanyProfile();
  }})
}

deleteCompanyBackground(){
  this.companyService.deleteCompanyBackground().subscribe({complete: () =>{
    this.getCompanyProfile();
  }})
}

  openBenefitsModal(){
    this.modalRef = this.modalService.show(BenefitsComponent, {class: 'modal-xl'});
    this.benefits = this.modalRef.content['selectedBenefits']
  
  }
  openTechnologiesModal(){
    this.modalRef = this.modalService.show(TechnologiesComponent, {class: 'modal-lg'});
    this.technologies = this.modalRef.content['selectedTechnologies']
   }

   addNewCompanyTechnologies(){
    if(this.technologies !== undefined){
      for (let i = 0; i < this.technologies.length; i++) {
        this.companyTechnologies.push(this.technologies[i]);
      }
    }
   }

   addNewCompanyBenefits(){
    if(this.benefits !== undefined){
      for (let i = 0; i < this.benefits.length; i++) {
        this.companyBenefits.push(this.benefits[i]);
      }
    }
   }
}
