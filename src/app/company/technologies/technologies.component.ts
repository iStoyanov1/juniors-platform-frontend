import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { TechnologiesService } from './technologies.service';
import { Technology } from './technology';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  technology$ : Observable<Technology[]>
  selectedTechnologies : Technology[]

  constructor(private technologyService: TechnologiesService, private modalService: BsModalService) { }

  ngOnInit(): void {

   this.technology$ =  this.technologyService.getAllTechnologies();
   this.selectedTechnologies = new Array<Technology>();

  }

  changeSelection(ev: any, technology:Technology){
    if(ev.target.checked){
        this.selectedTechnologies.push(technology)
    }else{
        this.selectedTechnologies = this.selectedTechnologies.filter(t=>t!=technology)
    }
}
  submitSelectedTechnologies(){
    this.modalService.hide();
  }
  closeModal() {
    this.modalService.hide();
    } 
}
