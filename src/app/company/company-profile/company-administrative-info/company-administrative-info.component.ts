import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyAdministrativeContacts } from '../../company-administrative-contacts';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-administrative-info',
  templateUrl: './company-administrative-info.component.html',
  styleUrls: ['./company-administrative-info.component.css']
})
export class CompanyAdministrativeInfoComponent implements OnInit {

  companyAdminstrativeContacts: CompanyAdministrativeContacts
  companyLogo: any
  form: FormGroup

  constructor(private companyService: CompanyService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAdminstrativeContacts()

    this.form = this.fb.group({
      email:['', [Validators.required, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)(\\D(\\.(\\w){2,3})+)$')]],
      firstName:['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,14})')]],
      lastName: ['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,20})')]],
      phone:['',[Validators.required, Validators.pattern('\\(?\\+?[0-9]{1,3}\\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\\s?\\d{1,6})?')]]
    })
  }

  getAdminstrativeContacts(){
    setTimeout(()=>{
    this.companyService.getAdministrativeContacts().subscribe((data)=> {
      this.companyAdminstrativeContacts = data
    })
  },1000)
  }

  getCompanyLogo(){
    if(this.companyAdminstrativeContacts['logo'] === null){
      return false
    }
    this.companyLogo = this.companyAdminstrativeContacts?.logo
    return true
  }
  getInvalid(){
    return this.form.invalid
  }
  getDirty(){
    return this.form.dirty
  }
  editCompanyAdminstrativeContacts(){
    if(confirm('Сигурен ли сте, че искате да направите промените')){
    this.companyService.editAdministrativeContacts(this.form.value).subscribe((data)=>{
      this.toastr.success(data['message'], "Съобщение")
    });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  }

}
