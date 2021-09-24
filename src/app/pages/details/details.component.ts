import { ICity, IListCity } from './../../interfaces/open-weather';
import { OpenWeatherService } from './../../services/open-weather.service';
import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
  @ViewChild("city") city: ElementRef;
  public weatherCity:ICity;
  public weatherForecast:IListCity;
  public github: string = "assets/icons/github.svg";
  public linkedin: string = "assets/icons/linkedin.svg";
  
  constructor(
    private weatherService: OpenWeatherService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.weatherCity = {
    clouds: {all:0},
    coord: {lat: 0, lon: 0},
    dt: 0,
    id: 0,
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0},
    name: '',
    sys: {
      country: "",
      id: 0,
      sunrise: 0,
      sunset: 0,
      type: 0
    },
    weather: [
      {
        description: "",
        icon: "",
        id: 0,
        main: ""
      }
    ],
    wind: {speed: 0, deg: 0},
    };

    this.weatherForecast = {
      cod: '',
      message:'',
      list:[]
    }

   }

  ngOnInit(): void {
    const {cityID} = this.getRouteParams();
    this.getCurrentWeather(cityID)
    this.getWeatherForecast(cityID)
    
  }

  submit(e:Event){
    e.preventDefault();
    this.search();
  }

  getRouteParams(){
    return this.route.snapshot.params;
  }

  getCurrentWeather(cityID: number){
    this.weatherService.currentWeather(cityID)
    .subscribe(
      response=>{
        this.weatherCity = {
          ...response,
          dt: moment(Number(response.dt) * 1000).format('HH:mm MMM DD'),
          sys:{
            sunrise:moment(Number(response.sys.sunrise) * 1000).format('HH:mm'),
            sunset:moment(Number(response.sys.sunset) * 1000).format('HH:mm'),
            country:response.sys.country            
          }
        }
        this.city.nativeElement.value = this.weatherCity.name;
      },
      error=>{
        console.log(error);
      }
    )
  }

  getWeatherForecast(cityID: number){
    this.weatherService.weatherForecast(cityID)
    .subscribe(
      response=>{
        const weatherForecastAux: ICity[] = [];
        response.list.map(forecast=>{
          weatherForecastAux.push({
            ...forecast,
            formated_dt_txt: moment(Number(forecast.dt) * 1000).format('MMM DD'),
            formated_time_txt: moment(Number(forecast.dt) * 1000).format('HH:mm')
          })
        })
        this.weatherForecast = {
          ...response,
          list:weatherForecastAux
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
 
  search(){
    this.router.navigate(['/search'], { queryParams: { q: this.city.nativeElement.value } });
  } 

}
