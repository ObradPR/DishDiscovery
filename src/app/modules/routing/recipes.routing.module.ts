import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent, SingleRecipeComponent } from '../../pages/recipes';
import { recipePageResolver } from '../../resolvers/recipe-page.resolver';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  {
    path: '',
    children: [
      {
        path: ':id',
        component: SingleRecipeComponent,
        resolve: { singleRecipe: recipePageResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
