import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyContacts } from 'src/app/models/company-contacts';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-company-profile-contacts',
  templateUrl: './company-profile-contacts.component.html',
  styleUrls: ['./company-profile-contacts.component.css']
})
export class CompanyProfileContactsComponent implements OnInit{

  form: FormGroup
  companyContacts: CompanyContacts  
  
  constructor(private fb: FormBuilder, private companyService: CompanyService, private toastr: ToastrService) {}

  ngOnInit(): void {

    this.getCompanyContacts()

    this.form = this.fb.group({
      companyAddress: ['', [Validators.required]],
      companyPhone: ['', [Validators.required, Validators.pattern('\\(?\\+?[0-9]{1,3}\\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\\s?\\d{1,6})?')]],
      companyWebsite:['', [Validators.required, 
        Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]]
    })

  }

  addCompanyContacts(){
    if(confirm('Сигурен ли сте, че искате да направите промените')){
    this.companyService.addCompanyContacts(this.form.value).subscribe((data) => {
      this.toastr.success(data['message'],"Съобщение")
      this.getCompanyContacts();
    });
    }
  }

  getCompanyContacts(){
    setTimeout(()=>{
      this.companyService.getCompanyContacts().subscribe((data)=>{
        if(data['message'] != null){
          this.toastr.info(data['message'],"Съобщение")
        }else{
          this.companyContacts = data
        }
      })
      },1000)
  }

  getCompanyAddress(){
    return this.companyContacts?.companyAddress !== undefined ? true : false 
      
  }
  getCompanyPhone(){
    return this.companyContacts?.companyPhone !== undefined ? true : false 
  }
  getCompanyWebsite(){
    return this.companyContacts?.companyWebsite !== undefined ? true : false 
  }

  isFormOnChange(){
    return this.form.dirty
  }

  invalidForm(){
    return this.form.invalid
  }
}
