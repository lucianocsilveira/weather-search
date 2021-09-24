import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private appId: string = '76d1b43ba3695cfae59aa9f7dc9b4877';
  private urlApi:string = 'https://api.openweathermap.org/data/2.5';
  private urlIcon:string = 'https://openweathermap.org/img/w';
  private urlFlag:string = 'http://openweathermap.org/images/flags';

  constructor() { }
  
  getUrl(type:'API' | 'ICON' | 'FLAG'):string{
    switch (type) {
      case 'API':
        return this.urlApi;
  
      case 'ICON':
        return this.urlIcon;

      case 'FLAG':
        return this.urlFlag;
    }
  }

  getAppID():string{
    return this.appId;
  }

}
