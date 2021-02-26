import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/user.service';
import { MustMatch } from '../validations/password-matcher-validator';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,14})')]],
      lastName: ['', [Validators.required, Validators.pattern('([А-Я][а-я]{1,20})')]],
      email: ['', [Validators.required, Validators.pattern('^([\\w\\.\\-]+)@([\\w\\-]+)(\\D(\\.(\\w){2,3})+)$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      confirmPassword: ['', Validators.required],
      acceptTerms:[false, Validators.pattern('true')]
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  registerUser(){
    this.userService.createUser(this.form.value).subscribe((data)=>{
      this.router.navigate(['/']);
    })
  }

  get f(){
    return this.form.controls;
  }

  get invalid(){
    return this.form.invalid;
  }
}
