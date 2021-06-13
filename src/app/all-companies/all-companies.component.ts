import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../services/company/company.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {

  allCompanies: any
  name:any
  formGroup:FormGroup

  constructor(private companyService: CompanyService, private fb: FormBuilder) {

    this.formGroup = this.fb.group({
      query: ['', Validators.nullValidator]
    })

   }

  ngOnInit(): void {
    this.getAllCompanies()
  }
  getAllCompanies(){
    console.log(this.formGroup.controls['query'].value);
    this.name = this.formGroup.controls['query'].value
    this.companyService.getAllCompanies(this.name).subscribe((data)=>{
      console.log(data)
      this.allCompanies = data
    })
  }
  searchCompanyByName(){
    console.log(this.formGroup.controls['query'].value);
    this.name = this.formGroup.controls['query'].value
    this.companyService.getAllCompanies(this.name).subscribe((data)=>{
      console.log(data)
      this.allCompanies = data
    })
  }
}
