import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipesComponent } from '../../pages/recipes';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  {
    path: '',
    children: [
      //   { path: ':id', component: SingleRecipeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
