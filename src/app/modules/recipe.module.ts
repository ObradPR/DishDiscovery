import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import * as recipes from '../pages/recipes/index';
import { RecipesRoutingModule } from './routing/recipes.routing.module';
import { SharedModule } from '../modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    recipes.FiltersComponent,
    recipes.RecipesComponent,
    recipes.SingleRecipeComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RecipesModule {}
