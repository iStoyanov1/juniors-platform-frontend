import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
declare var jQuery:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(ModalDirective) modal: ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }
 hideModal() {
    this.modal.hide();
  }
}
