import { trigger } from '@angular/animations';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import { UserService } from 'src/user.service';
import { User } from '../User';
import {response, saveAs} from 'file-saver'


const uploadFile = "http://localhost:8080/api/user/profile/cv"
const downloadFile = "http://localhost:8080/api/user/profile/download"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user:User

  formFile: FormGroup;

  constructor(private http: HttpClient, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.userService.getUserDetails().subscribe((data)=>{
      this.user = data;
      console.log(this.user);
    });

    this.formFile = this.fb.group({
      file :['', [Validators.nullValidator]]
    })
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

    this.http.post<any>(uploadFile, formData).subscribe((data)=>{
    this.user = data; 
    console.log(this.user);  
    });
   
  }
  isHasCV(){
    if(this.user['file'] === null){
      return false;
    }
    return true;
  }

  downloadFile(){

    /*let  headers= new HttpHeaders();

    headers.set('Accept', 'application/pdf');

    this.http.get(downloadFile, {
      headers: headers,
      responseType: 'arraybuffer'
    }).subscribe((data)=>{
      var filename = new Date();
      var blob = new Blob([response], {type: "application/pdf;charset=utf-8"});
      saveAs(blob, filename +".pdf");
    })*/

    this.userService.downloadPDF().subscribe(
      (res) => {
        console.log(res);
      var fileURL = URL.createObjectURL(res);
      window.open(fileURL);
      }
  );
  }
}
