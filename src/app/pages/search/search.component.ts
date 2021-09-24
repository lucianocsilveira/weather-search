import { ActivatedRoute, Router } from '@angular/router';
import { ICity } from './../../interfaces/open-weather';
import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { OpenWeatherService } from '../../services/open-weather.service'
 
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild("city") city: ElementRef;
 

  public listCity:ICity[];

  constructor(
    private weatherService: OpenWeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void{
    const {q} = this.getRouteParams();
    if(q){
      this.city.nativeElement.value = q;
      this.search(); 
    }
  }

  ngOnInit(): void {
    
  }

  submit(e:Event){
    e.preventDefault();
    this.search();
  }
    
  getRouteParams(){
    return this.route.snapshot.queryParams;
  }

  search(){
    this.weatherService.searchCity(this.city.nativeElement.value)
    .subscribe(
      response=>{
        this.listCity = response.list;
      },
      error=>{
        console.log(error);
      }
    )
  }

  viewDetail(cityID:number){
    this.router.navigate(["/details/"+cityID]);

  }

}
