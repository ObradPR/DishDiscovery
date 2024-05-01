import { Component, OnDestroy, OnInit } from '@angular/core';
import { IFeaturedRecipeDto } from '../../../common/interfaces/recipe/featured-recipe.interface';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-featured-recipes',
  templateUrl: './featured-recipes.component.html',
  styleUrl: './featured-recipes.component.css',
})
export class FeaturedRecipesComponent implements OnInit, OnDestroy {
  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  featuredRecipes: IFeaturedRecipeDto[] = [];
  subscriptions: Subscription[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.getFeaturedRecipes();
  }

  getFeaturedRecipes() {
    this.subscriptions.push(
      this.recipeService.getFeaturedRecipes().subscribe({
        next: (recipes) => (this.featuredRecipes = recipes),
        error: (err) => console.error(err),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
