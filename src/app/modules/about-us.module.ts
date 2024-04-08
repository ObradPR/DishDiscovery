import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutUsRoutingModule } from './about-us-routing.module';

import * as aboutUs from '../pages/about-us/index';

@NgModule({
  declarations: [
    aboutUs.AboutUsComponent,
    aboutUs.FaqsComponent,
    aboutUs.LegalInformationComponent,
  ],
  imports: [CommonModule, AboutUsRoutingModule],
})
export class AboutUsModule {}
