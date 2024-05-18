import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from '../pages/contact/contact.component';
import { UploadRecipeComponent } from '../pages/upload-recipe/upload-recipe.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { UserEngagementRoutingModule } from './routing/user-engagement-routing.module';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [ContactComponent, UploadRecipeComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserEngagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class UserEngagementModule {}
