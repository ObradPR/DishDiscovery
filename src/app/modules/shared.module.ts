import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [],
  imports: [CommonModule, CarouselModule],
  exports: [CarouselModule],
})
export class SharedModule {}
