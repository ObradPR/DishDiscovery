import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IBaseIngredientDto } from '../common/interfaces/recipe/base-ingredient.interface';
import { IFeaturedRecipeDto } from '../common/interfaces/recipe/featured-recipe.interface';
import { IRecipeDto } from '../common/interfaces/recipe/recipe.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private dataService: DataService) {}

  getFeaturedRecipes(): Observable<IFeaturedRecipeDto[]> {
    return this.dataService
      .get<IRecipeDto[]>('recipes.json')
      .pipe(map((recipes) => recipes.filter((recipe) => recipe.featured)));
  }

  getIngredients(): Observable<IBaseIngredientDto[]> {
    return this.dataService.get('ingredients.json');
  }

  getIngredientById(id: number): Observable<IBaseIngredientDto | undefined> {
    return this.dataService
      .get<IBaseIngredientDto[]>('ingredients.json')
      .pipe(map((ingredients) => ingredients.find((i) => i.id === id)));
  }
}
