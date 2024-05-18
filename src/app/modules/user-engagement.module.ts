import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from '../pages/contact/contact.component';
import { UploadRecipeComponent } from '../pages/upload-recipe/upload-recipe.component';
import { UserProfileComponent } from '../pages/user-profile/user-profile.component';
import { UserEngagementRoutingModule } from './routing/user-engagement-routing.module';
import { SharedModule } from './shared.module';
import { SearchResultsComponent } from '../pages/search-results/search-results.component';

@NgModule({
  declarations: [
    ContactComponent,
    UploadRecipeComponent,
    UserProfileComponent,
    SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    UserEngagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class UserEngagementModule {}
