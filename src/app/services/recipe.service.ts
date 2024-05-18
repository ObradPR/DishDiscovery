import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

import { DataService } from './data.service';
import { IRecipeDto } from '../common/interfaces/recipe/recipe.interface';
import { IFeaturedRecipeDto } from '../common/interfaces/recipe/featured-recipe.interface';
import { IBaseIngredientDto } from '../common/interfaces/recipe/base-ingredient.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: BehaviorSubject<IRecipeDto[]> = new BehaviorSubject<
    IRecipeDto[]
  >([]);
  private recipesInit: BehaviorSubject<IRecipeDto[]> = new BehaviorSubject<
    IRecipeDto[]
  >([]);

  getRecipes(): Observable<IRecipeDto[]> {
    return this.recipes.asObservable();
  }

  setRecipes(recipes: IRecipeDto[]) {
    this.recipes.next(recipes);
  }

  getRecipesInit(): Observable<IRecipeDto[]> {
    return this.recipesInit.asObservable();
  }

  setRecipesInit(recipes: IRecipeDto[]) {
    this.recipesInit.next(recipes);
    this.recipes.next(recipes);
  }

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

  getAllRecipes(): Observable<IRecipeDto[]> {
    return this.dataService.get('recipes.json');
  }

  getRecipeById(id: number): Observable<IRecipeDto | null> {
    return this.dataService
      .get<IRecipeDto[]>('recipes.json')
      .pipe(
        map((recipes) => recipes.find((recipe) => recipe.id === +id) || null)
      );
  }

  getRecipesBySearch(query: string): Observable<IRecipeDto[]> {
    query = query.toLocaleLowerCase();

    return this.dataService
      .get<IRecipeDto[]>('recipes.json')
      .pipe(
        map((recipes) =>
          recipes.filter((recipe) =>
            recipe.title.toLocaleLowerCase().includes(query)
          )
        )
      );
  }
}
