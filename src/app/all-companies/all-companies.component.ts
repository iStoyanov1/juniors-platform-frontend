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
  companiesSize: number

  constructor(private companyService: CompanyService, private fb: FormBuilder) {

    this.formGroup = this.fb.group({
      query: ['', Validators.nullValidator]
    })

   }

  ngOnInit(): void {
    this.getAllCompanies()
  }
  getAllCompanies(){
    this.name = this.formGroup.controls['query'].value
    this.companyService.getAllCompanies(this.name).subscribe((data)=>{
      console.log(data)
      this.allCompanies = data
      this.companiesSize = this.allCompanies.length
      console.log(this.allCompanies)
    })
  }
  searchCompanyByName(){
    this.name = this.formGroup.controls['query'].value
    this.companyService.getAllCompanies(this.name).subscribe((data)=>{
      this.allCompanies = data
      this.companiesSize = this.allCompanies.length
    })
  }
}
