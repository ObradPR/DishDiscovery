import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactComponent } from '../../pages/contact/contact.component';
import { UploadRecipeComponent } from '../../pages/upload-recipe/upload-recipe.component';
import { authGuard } from '../../guards/auth.guard';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { SearchResultsComponent } from '../../pages/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'contact', component: ContactComponent },
      {
        path: 'upload-recipe',
        component: UploadRecipeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [authGuard],
      },
      {
        path: 'search/:query',
        component: SearchResultsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserEngagementRoutingModule {}
