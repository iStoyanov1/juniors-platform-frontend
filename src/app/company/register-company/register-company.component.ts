import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company/company.service';
import { MustMatch } from 'src/app/validations/password-matcher-validator';


@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {

  form:FormGroup

  constructor(private fb: FormBuilder, private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      bulstat:['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      logo: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,14})')]],
      lastName: ['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,20})')]],
      email: ['', [Validators.required, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)(\\D(\\.(\\w){2,3})+)$')]],
      phone: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)(\\D(\\.(\\w){2,3})+)$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      confirmPassword: ['', Validators.required],
      acceptTerms:[false, Validators.pattern('true')]
    },{
      validator: MustMatch('password', 'confirmPassword')
    });

  }

  registerCompany(){
    
    const formData = new FormData();
    formData.append('logo', this.form.get('logo')?.value);
    formData.append('name', this.form.get('name')?.value);
    formData.append('bulstat', this.form.get('bulstat')?.value);
    formData.append('firstName', this.form.get('firstName')?.value);
    formData.append('lastName', this.form.get('lastName')?.value);
    formData.append('email', this.form.get('email')?.value);
    formData.append('phone', this.form.get('phone')?.value);
    formData.append('username', this.form.get('username')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('confirmPassword', this.form.get('confirmPassword')?.value);
    // this.form.controls['logo'].setValue(formData)
    // console.log(this.form.value)
    this.companyService.createCompany(formData).subscribe((data)=>{
      console.log(data)
    })
  }

  onLogoSelect(event){
    if (event.target.files.length>0){
      const logo = event.target.files[0];
      this.form.get('logo')?.setValue(logo);
    }
  }

  get f(){
    return this.form.controls
  }

  get invalid(){
    return this.form.invalid;
  }
}
