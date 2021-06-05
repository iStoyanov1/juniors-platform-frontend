import { trigger } from '@angular/animations';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { MustMatch } from 'src/app/validations/password-matcher-validator';


const uploadFile = "http://localhost:8080/api/user/profile/cv"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User

  formFile: FormGroup;
  formEditPassword:FormGroup;
  successMessage: any;
  errorMessage: any;

  

  constructor(private http: HttpClient, private userService: UserService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.getUserProfile();
 
    this.formFile = this.fb.group({
      file :['', [Validators.required, Validators.pattern('^.+\.([pP][dD][fF])$')]],
    })

    this.formEditPassword = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
      confirmPassword: ['', Validators.required],
      oldPassword: ['', Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onFileSelect(event){
    if (event.target.files.length>0){
      const cv = event.target.files[0];
      this.formFile.get('file')?.setValue(cv);
    }
  }

  uploadFile(){
    const formData = new FormData();
    formData.append('file', this.formFile.get('file')?.value);

    this.http.post<any>(uploadFile, formData).subscribe({complete: () => {
      this.getUserProfile();
    },
  });   
}
  downloadFile(){

    this.userService.downloadPDF().subscribe(
      (res) => {
      var fileURL = URL.createObjectURL(res);
      window.open(fileURL);
      });
  }

  deleteFile(){
    if(confirm('Сигурен ли сте, че искате да изтриете файла')){
    this.userService.deleteCV().subscribe({complete: ()=>{
      this.getUserProfile();
    },
  })
}
  }

  userEditPassword(){
    this.userService.userEditPassword(this.formEditPassword.value).subscribe((data) =>{
      this.successMessage = data['message'];
      this.formEditPassword.reset()
    }), err =>{
      this.errorMessage = err;
    }
  }

  isHasCV(){
    if(this.user['file'] === null){
      return false;
    }
    return true;
  }

  getUserProfile(){
    setTimeout(()=>{
      this.userService.getUserDetails().subscribe((data)=>{
        this.user = data;
      });
    }, 1000);
   
  }

  

  invalid(){
    return this.formFile.invalid;
  }

  get f(){
    return this.formEditPassword.controls;
  }

  invalidEditPass(){
    return this.formEditPassword.invalid;
  }
}
