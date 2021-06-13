import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  form:FormGroup
  successMessage:any

  constructor(private modalService: BsModalService, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      username:['',Validators.nullValidator]
    })

  }
  closeModal() {
    this.modalService.hide();
  }

  sendNewPassword(){
    this.userService.userForgotPassword(this.form.value).subscribe((data)=>{
      this.successMessage = data['message']
    })
    this.form.reset()
  }

}
