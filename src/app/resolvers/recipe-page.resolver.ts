import { ResolveFn } from '@angular/router';
import { IRecipeDto } from '../common/interfaces/recipe/recipe.interface';
import { inject } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

export const recipePageResolver: ResolveFn<IRecipeDto | null> = (
  route,
  state
) => {
  const recipeService = inject(RecipeService);

  return recipeService.getRecipeById(route.params['id']);
};
