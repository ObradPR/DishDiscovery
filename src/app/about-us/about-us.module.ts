import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from './about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AboutUsRoutingModule } from './about-us-routing.module';

@NgModule({
  declarations: [AboutUsComponent, FaqsComponent],
  imports: [CommonModule, AboutUsRoutingModule],
})
export class AboutUsModule {}
