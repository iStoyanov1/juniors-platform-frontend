import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/auth.service';
declare var jQuery:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  auth(){
   this.authService.login(this.form.value).subscribe((data)=>{
     let authotization = data['Authorization']
     let userData = authotization['user'];
    localStorage.setItem('token', authotization['Bearer']);
    localStorage.setItem('email', userData['email']);
    localStorage.setItem('role', userData['role']);

    if(userData['role'] === 'USER' || userData['role'] === 'MODERATOR'){
    this.router.navigate(['/user/profile'])
    }else{
      this.router.navigate(['/company/profile'])
    }
   })
   this.closeModal();
  }

  get f(){
    return this.form.controls;
  }

  get invalid(){
    return this.form.invalid;
  }

  closeModal() {
    this.modalService.hide();
  }
  getToken(){
    localStorage.getItem('token');
  }
}
