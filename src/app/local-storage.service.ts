import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { 
  }

  setSurveyData(data:any) {       
    let defaultData = this.getSurveyData()
    if(defaultData) {
      let defaultArray = JSON.parse(defaultData);
      defaultArray.push(data)
      localStorage.setItem('survey-data',JSON.stringify(defaultArray))
    } else {
      let a = [];
      a.push(data)
      localStorage.setItem('survey-data',JSON.stringify(a))
    }   
  }

  getSurveyData() {
    return localStorage.getItem('survey-data')
  }

  updateSurveyData(data:any){
    let defaultData = this.getSurveyData()
    if(defaultData) {
      let defaultArray = JSON.parse(defaultData);
      let index = defaultArray.findIndex((item:any) => item.id == data.id)
      if(index != -1) {
        defaultArray[index] = data
        localStorage.setItem('survey-data',JSON.stringify(defaultArray))
      }
    }
  }

  findNext(data:any){
    let defaultData = this.getSurveyData()
    if(defaultData) {
      let defaultArray = JSON.parse(defaultData);
      let index = defaultArray.findIndex((item:any) => item.id == data.id)
      if(index != -1 &&  defaultArray[index + 1]) {
        return defaultArray[index + 1]
      }
    }
    return null
  }
}
