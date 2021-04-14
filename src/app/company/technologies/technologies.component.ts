import { Component, Output, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  technologiesForm: FormGroup

  selectedTechnologies : Technology[]

  public event: EventEmitter<any> = new EventEmitter();

  constructor(private technologyService: TechnologiesService, private formBuilder: FormBuilder,
     private modalService: BsModalService) {

      this.technologiesForm = this.formBuilder.group({
        technologies:['', Validators.nullValidator]
      })
    }

  ngOnInit(): void {

   this.technology$ =  this.technologyService.getAllTechnologies();
   this.selectedTechnologies = new Array<Technology>();
  }

  changeSelection(ev: any, technology:Technology): Technology[]{
    if(ev.target.checked){
        this.selectedTechnologies.push(technology)
    }else{
        this.selectedTechnologies = this.selectedTechnologies.filter(t=>t!=technology)
    }
    return this.selectedTechnologies
  }

  addTechnologies(form){
    this.triggerEvent(this.selectedTechnologies);
    this.modalService.hide();
  }

  triggerEvent(item: Technology[]) {
    this.event.emit({ data: item , res:200 });
  }
  submitSelectedTechnologies(){
    this.modalService.hide();
  }
  closeModal() {
    this.modalService.hide();
    } 
}
