import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../pages/home/home.component';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, AppRoutingModule, SharedModule],
})
export class HomeModule {}
