import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../pages/home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CarouselModule, AppRoutingModule],
})
export class HomeModule {}
