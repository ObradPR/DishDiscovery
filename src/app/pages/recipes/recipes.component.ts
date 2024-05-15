import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IRecipeDto } from '../../common/interfaces/recipe/recipe.interface';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipes: IRecipeDto[] = [];
  subscriptions: Subscription[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.recipeService.getAllRecipes().subscribe({
        next: (data) => {
          this.recipeService.setRecipesInit(data);
          this.recipeService.setRecipes(data);
        },
      }),
      this.recipeService
        .getRecipes()
        .subscribe({ next: (data) => (this.recipes = data) })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
