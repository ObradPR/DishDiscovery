import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { IRecipeDto } from '../common/interfaces/recipe/recipe.interface';
import { IFeaturedRecipeDto } from '../common/interfaces/recipe/featured-recipe.interface';

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
}
