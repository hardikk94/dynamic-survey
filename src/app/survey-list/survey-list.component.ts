import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {
  surveyList:any =[];
  currentValue:any = null;
  lastValue:any = null
  constructor(private storageService:LocalStorageService,
    private router:Router) { 
    let data = this.storageService.getSurveyData();
    if(data){
      this.surveyList = JSON.parse(data)
      this.currentValue = this.surveyList[0]
      this.lastValue = this.surveyList[this.surveyList.length - 1]
    }
  }

  ngOnInit(): void {
  }

  nextQuestion(obj:any){
    if(this.lastValue?.id != this.currentValue.id) {      
      this.storageService.updateSurveyData(obj);
      this.currentValue = this.storageService.findNext(obj);
    } else {
      this.storageService.updateSurveyData(obj);
      alert("Survey successfully submitted!!")
    }   
  }

  goBack() {
    this.router.navigate(['/survey-form'])
  }

  checkCurrent(){
    let item = this.currentValue.inputType;    
    return item.some((item:any) => item.value == '')
  }  
  onChange(data:any,isCheckbox:boolean,index:any){
    if(isCheckbox) {
      let val = data?.target?.checked;      
      if(this.currentValue) {        
        this.currentValue.inputType[index].value = val;        
      }
    } 
  }

}
