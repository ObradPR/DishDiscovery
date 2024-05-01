import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../pages/contact/contact.component';
import { UserEngagementRoutingModule } from './routing/user-engagement-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, UserEngagementRoutingModule, ReactiveFormsModule],
})
export class UserEngagementModule {}
