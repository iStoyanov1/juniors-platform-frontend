import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/company.service';
import { MustMatch } from '../validations/password-matcher-validator';

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
      logo: ['', [Validators.nullValidator]],
      firstName: ['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,14})')]],
      lastName: ['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,20})')]],
      email: ['', [Validators.required, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)(\\D(\\.(\\w){2,3})+)$')]],
      phone: ['', [Validators.required]],
      companySignInEmail: ['', [Validators.required, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)(\\D(\\.(\\w){2,3})+)$')]],
      companySignInPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      companySignInConfirmPassword: ['', Validators.required],
      acceptTerms:[false, Validators.pattern('true')]
    },{
      validator: MustMatch('companySignInPassword', 'companySignInConfirmPassword')
    });

  }

  registerCompany(){
    this.companyService.createCompany(this.form.value).subscribe((data)=>{
      this.router.navigate(['/'])
    })
  }

  get f(){
    return this.form.controls
  }

  get invalid(){
    return this.form.invalid;
  }

}
