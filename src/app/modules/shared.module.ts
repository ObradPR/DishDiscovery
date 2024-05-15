import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselModule as PrimeNgCarouselModule } from 'primeng/carousel';
import { ExtractCharactersPipe } from '../pipes/extract-characters.pipe';

@NgModule({
  declarations: [ExtractCharactersPipe],
  imports: [CommonModule, NgxCarouselModule.forRoot(), PrimeNgCarouselModule],
  exports: [NgxCarouselModule, PrimeNgCarouselModule, ExtractCharactersPipe],
})
export class SharedModule {}
