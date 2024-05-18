import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselModule as PrimeNgCarouselModule } from 'primeng/carousel';
import { ExtractCharactersPipe } from '../pipes/extract-characters.pipe';
import { ArrayToStringPipe } from '../pipes/array-to-string.pipe';

@NgModule({
  declarations: [ExtractCharactersPipe, ArrayToStringPipe],
  imports: [CommonModule, NgxCarouselModule.forRoot(), PrimeNgCarouselModule],
  exports: [
    NgxCarouselModule,
    PrimeNgCarouselModule,
    ExtractCharactersPipe,
    ArrayToStringPipe,
  ],
})
export class SharedModule {}
