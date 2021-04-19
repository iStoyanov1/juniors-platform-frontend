import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/validations/password-matcher-validator';
import { CompanyAuthView } from '../../company-credentials';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-credentials',
  templateUrl: './company-credentials.component.html',
  styleUrls: ['./company-credentials.component.css']
})
export class CompanyCredentialsComponent implements OnInit {

  companyAuthView: CompanyAuthView
  companyLogo:any
  form: FormGroup

  constructor(private companyService: CompanyService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCompanyCredentials()
    this.form = this.fb.group({
      username: ['', [Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)(\\D(\\.(\\w){2,3})+)$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      confirmPassword: ['', [Validators.required]],
      oldPassword: ['', [Validators.required]],
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  getCompanyCredentials(){
    setTimeout(() => {
      this.companyService.getCompanyCredentails().subscribe((data)=>{
        this.companyAuthView = data
      })
    }, 1000);
  
  }
  getCompanyLogo(){
    if(this.companyAuthView['logo'] === null){
      return false
    }
    this.companyLogo = this.companyAuthView?.logo
    return true
  }

  editCompanyCredentials(){ 
  //   if(confirm('Сигурен ли сте, че искате да направите промените')){
  //   this.companyService.editCompanyCredentials(this.form.value).subscribe((data)=>{
  //     this.toastr.success(data['message'], "Съобщение")
  //   })
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1000);
  // }
  console.log(this.form.value)
  }

  getInvalid(){
    return this.form.invalid
  }
  getDirty(){
    return this.form.dirty
  }
  get f(){
    return this.form.controls;
  }

}
