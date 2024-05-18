import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselModule as PrimeNgCarouselModule } from 'primeng/carousel';
import { ExtractCharactersPipe } from '../pipes/extract-characters.pipe';
import { ArrayToStringPipe } from '../pipes/array-to-string.pipe';
import { CalculateAgePipe } from '../pipes/calculate-age.pipe';

@NgModule({
  declarations: [ExtractCharactersPipe, ArrayToStringPipe, CalculateAgePipe],
  imports: [CommonModule, NgxCarouselModule.forRoot(), PrimeNgCarouselModule],
  exports: [
    NgxCarouselModule,
    PrimeNgCarouselModule,
    ExtractCharactersPipe,
    ArrayToStringPipe,
    CalculateAgePipe,
  ],
})
export class SharedModule {}
