import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutUsRoutingModule } from './routing/about-us-routing.module';

import * as aboutUs from '../pages/about-us/index';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    aboutUs.AboutUsComponent,
    aboutUs.FaqsComponent,
    aboutUs.LegalInformationComponent,
    aboutUs.TestimonialsComponent,
    aboutUs.SiteStatsComponent,
  ],
  imports: [CommonModule, AboutUsRoutingModule, SharedModule],
})
export class AboutUsModule {}
