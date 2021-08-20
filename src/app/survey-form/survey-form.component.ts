import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
export const list = [{
  "name":'text',
  "type":'text'
},{
  "name":'number',
  "type":'number'
  },{
    "name":'checkbox',
    "type":'checkbox'
  }]

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  selectionList:any = [];
  constructor(private router:Router,
    private storageService:LocalStorageService) { 
    this.selectionList = list
  }

  ngOnInit(): void {
  }

  goToListing() {
    this.router.navigate(['/survey-list'])
  }

  goToNextQuestion() {
    this.goToListing()
  }

  onSubmit(surveyForm:any){    
    let inputs = surveyForm.value.inputType
    let inputsMap = inputs.map((item:any ,index:any)=>  ({
      input:item,
      value:'',
      id:index
    }))
    let data = {
      inputType:inputsMap,
      question:surveyForm.value.question,      
      id:`item${new Date().getTime()}`
    }
    this.storageService.setSurveyData(data)
    surveyForm.reset()
  }

}
