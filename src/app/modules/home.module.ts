import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as home from '../pages/home/index';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    home.HomeComponent,
    home.CategoryShowcaseComponent,
    home.FeaturedRecipesComponent,
  ],
  imports: [CommonModule, AppRoutingModule, SharedModule],
})
export class HomeModule {}
