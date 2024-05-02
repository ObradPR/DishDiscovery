import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../pages/errors/not-found/not-found.component';
import { ErrorRoutingModule } from './routing/error-routing.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, ErrorRoutingModule],
})
export class ErrorModule {}
