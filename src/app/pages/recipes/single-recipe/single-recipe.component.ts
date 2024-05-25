import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRecipeDto } from '../../../common/interfaces/recipe/recipe.interface';
import { UserService } from '../../../services/user.service';
import { IUserDto } from '../../../common/interfaces/user/user.interface';
import { CategoryService } from '../../../services/category.service';
import { IMealTypeDto } from '../../../common/interfaces/category/meal-type.interface';
import { ICuisineDto } from '../../../common/interfaces/category/cuisine.interface';
import { ICategoryDto } from '../../../common/interfaces/category/category.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css',
})
export class SingleRecipeComponent implements OnInit {
  subscriptions: Subscription[] = [];
  recipe: IRecipeDto | null = null;
  uploadedBy: IUserDto | undefined;
  mealType: IMealTypeDto | undefined;
  cuisines: ICuisineDto[] = [];
  categories: ICategoryDto[] = [];
  rateForm: FormGroup = this.fb.group({});
  isLogged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.formInit();

    this.subscriptions.push(
      this.route.data.subscribe({
        next: (data) => {
          this.recipe = data['singleRecipe'];

          this.getRecipeInfo();
        },
      })
    );
  }

  formInit() {
    this.rateForm = this.fb.group({
      rating: [0, [Validators.required, Validators.maxLength(1)]],
      content: ['', [Validators.required]],
    });
  }

  onRateRecipe() {
    if (this.rateForm.invalid) return;

    this.rateForm.reset();
    console.log('Successfully rated!');
  }

  getRecipeInfo() {
    if (!this.recipe) return;

    this.subscriptions.push(
      this.userService.getUserById(this.recipe.user_id).subscribe({
        next: (data) => {
          if (data) {
            this.uploadedBy = data;
          }
        },
      }),
      this.categoryService.getMealTypeById(this.recipe.meal_type).subscribe({
        next: (data) => {
          if (data) {
            this.mealType = data;
          }
        },
      }),
      this.categoryService.getCuisinesByIds(this.recipe.tags).subscribe({
        next: (data) => {
          if (data) {
            this.cuisines = data;
          }
        },
      }),
      this.categoryService
        .getCategoriesByIds(this.recipe.categories)
        .subscribe({
          next: (data) => {
            if (data) {
              this.categories = data;
            }
          },
        })
    );
  }
}
