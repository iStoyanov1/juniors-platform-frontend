import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  modalRef: BsModalRef

  constructor(private modalService: BsModalService,public authService: AuthService, public router: Router) { }

  ngOnInit(): void {

  }

  openModal(){
    this.modalRef = this.modalService.show(LoginComponent);

  }

  accountLink(){
    if(localStorage.getItem('role') === 'ROLE_USER' || localStorage.getItem('role') === 'ROLE_MODERATOR'){
      return ['/user/profile'];
    }else{
      return ['/company/profile']
    }
  }

  logout() {
    this.authService.logout();
    
    this.router.navigate(['/']);
  }
}
