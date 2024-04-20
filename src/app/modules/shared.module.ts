import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselModule as PrimeNgCarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

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
