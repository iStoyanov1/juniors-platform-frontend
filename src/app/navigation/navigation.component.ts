import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  modalRef: BsModalRef

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {

  }

  openModal(){
    this.modalRef = this.modalService.show(LoginComponent);
  }

}
