import { IListCity, ICity } from './../interfaces/open-weather';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(
    private http:HttpClient,
    private api:ApiService
  ) { 

  }

  searchCity(city:string):Observable<IListCity>{
    return this.http.get<IListCity>(
      `${this.api.getUrl('API')}/find/?q=${city}&appid=${this.api.getAppID()}&units=metric`
    )
  }

  currentWeather(cityID: number):Observable<ICity>{
    return this.http.get<ICity>(
      `${this.api.getUrl('API')}/weather/?id=${cityID}&appid=${this.api.getAppID()}&units=metric`
    )
  }

  weatherForecast(cityID: number):Observable<IListCity>{
    return this.http.get<IListCity>(
      `${this.api.getUrl('API')}/forecast/?id=${cityID}&appid=${this.api.getAppID()}&units=metric`
    )
  }

}
