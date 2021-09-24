import { AppComponent } from './app.component';
import { DetailsComponent } from './pages/details/details.component';
import { SearchComponent } from './pages/search/search.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    component: AppComponent, 
    children: [
      {path: '', redirectTo: 'search', pathMatch: 'full'},
      {path: 'search', component: SearchComponent},
      {path: 'details/:cityID', component: DetailsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
