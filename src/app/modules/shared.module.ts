import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { ButtonModule } from 'primeng/button';
import { CarouselModule as PrimeNgCarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxCarouselModule.forRoot(),
    PrimeNgCarouselModule,
    TagModule,
    ButtonModule,
  ],
  exports: [NgxCarouselModule, PrimeNgCarouselModule, TagModule, ButtonModule],
})
export class SharedModule {}
