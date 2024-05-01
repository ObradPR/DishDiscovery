import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '../pages/contact/contact.component';
import { UserEngagementRoutingModule } from './routing/user-engagement-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadRecipeComponent } from '../pages/upload-recipe/upload-recipe.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';

@NgModule({
  declarations: [ContactComponent, UploadRecipeComponent, UserProfileComponent],
  imports: [CommonModule, UserEngagementRoutingModule, ReactiveFormsModule],
})
export class UserEngagementModule {}
