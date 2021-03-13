import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/auth.service';
import { JwtInterceptorService } from 'src/jwt-interceptor.service';
declare var jQuery:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  modalRef: BsModalRef;
  badCredentials: any;
    
  constructor(private modalService: BsModalService, private fb: FormBuilder, private authService: AuthService, 
    private router: Router) { }

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

    if(userData['role'] === 'ROLE_USER' || userData['role'] === 'ROLE_MODERATOR'){
    this.router.navigate(['/user/profile'])
    }else{
      this.router.navigate(['/company/profile'])
    }
     this.closeModal();
   }, err =>{
     this.badCredentials = "Няма намерен потребител."
   }) 
  
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
