import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IMealTypeDto } from '../../../common/interfaces/category/meal-type.interface';
import { IRecipeDto } from '../../../common/interfaces/recipe/recipe.interface';
import { CategoryService } from '../../../services/category.service';
import { RecipeService } from '../../../services/recipe.service';
import { ICookingTimeDto } from '../../../common/interfaces/category/cooking-time.interface';
import { IDifficultyCookingDto } from '../../../common/interfaces/category/difficulty-cooking.interface';
import { IDietaryInfoDto } from '../../../common/interfaces/recipe/dietary-info.interface';
import { ICuisineDto } from '../../../common/interfaces/category/cuisine.interface';

type TFilterInfo = { name: string; count: number };

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  recipes: IRecipeDto[] = [];
  recipesInit: IRecipeDto[] = [];
  mealTypes: IMealTypeDto[] = [];
  mealTypesInfo: TFilterInfo[] = [];
  selectedMealTypes: string[] = [];
  categories: { id: number; name: string }[] = [];
  categoriesInfo: TFilterInfo[] = [];
  selectedCategories: number[] = [];
  cookingTimes: ICookingTimeDto[] = [];
  cookingTimesInfo: TFilterInfo[] = [];
  selectedCookingTimes: string[] = [];
  difficultyCookings: IDifficultyCookingDto[] = [];
  difficultyCookingsInfo: TFilterInfo[] = [];
  selectedDifficultyCookings: string[] = [];
  cuisines: ICuisineDto[] = [];
  cuisinesInfo: TFilterInfo[] = [];
  selectedCuisines: number[] = [];

  constructor(
    private recipeService: RecipeService,
    private elementRef: ElementRef,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getMealTypes();
    this.getCategories();
    this.getCookingTimes();
    this.getDifficulties();
    this.getCuisines();
  }

  getRecipes() {
    this.subscriptions.push(
      this.recipeService.getRecipes().subscribe({
        next: (data) => {
          if (this.recipesInit.length === 0) {
            this.recipesInit = data;
          }
          this.recipes = data;
        },
      }),
      this.recipeService.getRecipesInit().subscribe({
        next: (data) => (this.recipesInit = data),
      })
    );
  }

  getMealTypes() {
    const mealTypesCount: { [key: string]: number } = {};
    let mt: IMealTypeDto[] = [];

    this.subscriptions.push(
      this.categoryService.getMealTypes().subscribe({
        next: (data) => {
          this.mealTypes = data;
          mt = data;

          this.recipes.forEach((recipe) => {
            const mealType = mt.find((x) => x.id === recipe.meal_type);

            if (mealType) {
              mealTypesCount[mealType.name] = mealTypesCount.hasOwnProperty(
                mealType.name
              )
                ? ++mealTypesCount[mealType.name]
                : 1;
            }
          });

          this.mealTypesInfo = Object.keys(mealTypesCount).map((mtName) => ({
            name: mtName,
            count: mealTypesCount[mtName],
          }));
        },
      })
    );
  }

  getCategories() {
    const categoriesCount: { [key: string]: number } = {};
    let categs: { id: number; name: string }[] = [];

    this.subscriptions.push(
      this.categoryService.getCategories().subscribe({
        next: (data) => {
          data.forEach((category) => {
            this.categories.push({
              id: category.id,
              name: category.name,
            });
          });
          categs = this.categories;

          this.recipes.forEach((recipe) => {
            recipe.categories.forEach((categoryId) => {
              const category = categs.find((c) => c.id === categoryId);

              if (category) {
                const propertyName = categoryId + category.name;
                categoriesCount[propertyName] = categoriesCount.hasOwnProperty(
                  propertyName
                )
                  ? ++categoriesCount[propertyName]
                  : 1;
              }
            });
          });

          this.categoriesInfo = Object.keys(categoriesCount).map(
            (propertyName) => ({
              name: propertyName,
              count: categoriesCount[propertyName],
            })
          );
        },
      })
    );
  }

  getCuisines() {
    const cuisinesCount: { [key: string]: number } = {};
    let c: ICuisineDto[] = [];

    this.categoryService.getCuisines().subscribe({
      next: (data) => {
        this.cuisines = data;
        c = data;

        this.recipes.forEach((recipe) => {
          if (recipe.tags.length === 0) {
            const propertyName = 'Empty';
            cuisinesCount[propertyName] = cuisinesCount.hasOwnProperty(
              propertyName
            )
              ? ++cuisinesCount[propertyName]
              : 1;
          } else {
            recipe.tags.forEach((tagId) => {
              const tag = c.find((c) => c.id === tagId);

              if (tag) {
                const propertyName = tagId + tag.name;
                cuisinesCount[propertyName] = cuisinesCount.hasOwnProperty(
                  propertyName
                )
                  ? ++cuisinesCount[propertyName]
                  : 1;
              }
            });
          }
        });

        this.cuisinesInfo = Object.keys(cuisinesCount).map((propertyName) => ({
          name: propertyName,
          count: cuisinesCount[propertyName],
        }));
      },
    });
  }

  getCookingTimes() {
    const cookingTimesCount: { [key: string]: number } = {};
    let ct: ICookingTimeDto[] = [];

    this.subscriptions.push(
      this.categoryService.getCookingTimes().subscribe({
        next: (data) => {
          this.cookingTimes = data;
          ct = data;

          this.recipes.forEach((recipe) => {
            const cookingTime = ct.find((x) => x.name === recipe.cooking_time);

            if (cookingTime) {
              cookingTimesCount[cookingTime.name] =
                cookingTimesCount.hasOwnProperty(cookingTime.name)
                  ? ++cookingTimesCount[cookingTime.name]
                  : 1;
            }
          });

          this.cookingTimesInfo = Object.keys(cookingTimesCount).map(
            (ctName) => ({
              name: ctName,
              count: cookingTimesCount[ctName],
            })
          );

          this.cookingTimesInfo = this.cookingTimesInfo.sort((a, b) => {
            const timeA = this.parseCookingTime(a.name);
            const timeB = this.parseCookingTime(b.name);
            return timeA - timeB;
          });
        },
      })
    );
  }

  getDifficulties() {
    const difficultyCookingsCount: { [key: string]: number } = {};
    let dc: IDifficultyCookingDto[] = [];

    this.subscriptions.push(
      this.categoryService.getDifficultyCooking().subscribe({
        next: (data) => {
          this.difficultyCookings = data;
          dc = data;

          this.recipes.forEach((recipe) => {
            const difficulty = dc.find((x) => x.name === recipe.difficulty);

            if (difficulty) {
              difficultyCookingsCount[difficulty.name] =
                difficultyCookingsCount.hasOwnProperty(difficulty.name)
                  ? ++difficultyCookingsCount[difficulty.name]
                  : 1;
            }
          });

          this.difficultyCookingsInfo = Object.keys(
            difficultyCookingsCount
          ).map((dcName) => ({
            name: dcName,
            count: difficultyCookingsCount[dcName],
          }));
        },
      })
    );
  }

  checkSelectedFilters(recipesArr: IRecipeDto[]): IRecipeDto[] {
    // Cuisines
    this.selectedCuisines = [];

    const cuisinesTB = this.elementRef.nativeElement.querySelectorAll(
      '.tb-cuisines:checked'
    );

    cuisinesTB.forEach((el: HTMLInputElement) => {
      this.selectedCuisines.push(Number.parseInt(el.value));
    });

    // Cooking times
    this.selectedCookingTimes = [];

    const cts =
      this.elementRef.nativeElement.querySelectorAll('.tb-ct:checked');

    cts.forEach((el: HTMLInputElement) => {
      this.selectedCookingTimes.push(
        (<HTMLElement>el.nextElementSibling).innerText
      );
    });

    // Difficulties
    this.selectedDifficultyCookings = [];

    const dcs =
      this.elementRef.nativeElement.querySelectorAll('.tb-dcs:checked');

    dcs.forEach((el: HTMLInputElement) => {
      this.selectedDifficultyCookings.push(
        (<HTMLElement>el.nextElementSibling).innerText
      );
    });

    // Meal Types
    this.selectedMealTypes = ['Medium'];

    const mealTs = this.elementRef.nativeElement.querySelectorAll(
      '.tb-mealTypes:checked'
    );

    mealTs.forEach((el: HTMLInputElement) => {
      this.selectedMealTypes.push(
        (<HTMLElement>el.nextElementSibling).innerText
      );
    });

    // FILTERING
    this.recipes = this.recipesInit.filter((recipe) =>
      recipe.categories.some((categoryId) =>
        this.selectedCategories.includes(categoryId)
      )
    );

    recipesArr = this.recipesInit.filter((recipe) => {
      const mealType = this.mealTypes.find((t) => t.id === recipe.meal_type);

      return (
        mealType &&
        this.selectedMealTypes.includes(mealType.name) &&
        this.selectedCookingTimes.includes(recipe.cooking_time) &&
        this.selectedDifficultyCookings.includes(recipe.difficulty) &&
        recipe.tags.some((cuisineId) =>
          this.selectedCuisines.includes(cuisineId)
        )
      );
    });

    return recipesArr;
  }
  
  onCategoriesChange() {
    this.selectedCategories = [];

    const categories = this.elementRef.nativeElement.querySelectorAll(
      '.tb-categories:checked'
    );

    categories.forEach((el: HTMLInputElement) => {
      this.selectedCategories.push(Number.parseInt(el.value));
    });

    if (this.selectedCategories.length === 0) return;

    this.subscriptions.push(
      this.recipeService.getAllRecipes().subscribe({
        next: (data) => {
          this.recipes = data.filter((recipe) =>
            recipe.categories.some((categoryId) =>
              this.selectedCategories.includes(categoryId)
            )
          );

          this.recipeService.setRecipes(this.recipes);
          this.recipeService.setRecipesInit(this.recipes);

          this.getMealTypes();
          this.getCookingTimes();
          this.getCuisines();
          this.getDifficulties();
        },
      })
    );
  }

  onFilterChange() {
    this.recipes = this.checkSelectedFilters(this.recipes);
    this.recipeService.setRecipes(this.recipes);
  }

  private parseCookingTime(name: string): number {
    const parts = name.split(' ');

    let minutes = 0;

    for (const part of parts) {
      if (part === 'h') {
        minutes += parseInt(parts[parts.indexOf(part) - 1]) * 60;
      } else if (part === 'min') {
        minutes += parseInt(parts[parts.indexOf(part) - 1]);
      }
    }

    return minutes;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
