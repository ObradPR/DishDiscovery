import { Component, ElementRef, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, take } from 'rxjs';
import { ICookingTimeDto } from '../../common/interfaces/category/cooking-time.interface';
import { ICuisineDto } from '../../common/interfaces/category/cuisine.interface';
import { IDifficultyCookingDto } from '../../common/interfaces/category/difficulty-cooking.interface';
import { IMealTypeDto } from '../../common/interfaces/category/meal-type.interface';
import { IBaseIngredientDto } from '../../common/interfaces/recipe/base-ingredient.interface';
import { CategoryService } from '../../services/category.service';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-upload-recipe',
  templateUrl: './upload-recipe.component.html',
  styleUrl: './upload-recipe.component.css',
})
export class UploadRecipeComponent implements OnInit {
  uploadForm: FormGroup = this.fb.group({});
  mealTypes$: Observable<IMealTypeDto[]> | undefined;
  difficultyCooking$: Observable<IDifficultyCookingDto[]> | undefined;
  cookingTimes$: Observable<ICookingTimeDto[]> | undefined;
  cuisines$: Observable<ICuisineDto[]> | undefined;
  ingredients$: Observable<IBaseIngredientDto[]> | undefined;
  flattenedCategories: { id: number; name: string }[] = [];
  uploadBtnDisabled = true;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private recipeService: RecipeService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getFormBaseDetails();
  }

  getFormBaseDetails() {
    this.mealTypes$ = this.categoryService.getMealTypes();
    this.difficultyCooking$ = this.categoryService.getDifficultyCooking();
    this.cookingTimes$ = this.categoryService.getCookingTimes();
    this.cuisines$ = this.categoryService.getCuisines();
    this.ingredients$ = this.recipeService.getIngredients();

    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe({
        next: (categories) => {
          categories.forEach((category) => {
            this.flattenedCategories.push({
              id: category.id,
              name: category.name,
            });

            if (category.subcategories) {
              category.subcategories.forEach((subcategory) => {
                this.flattenedCategories.push({
                  id: subcategory.id,
                  name: subcategory.name,
                });
              });
            }
          });
        },
      });
  }

  formInit() {
    this.uploadForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      instructions: ['', [Validators.required, Validators.maxLength(3000)]],
      mealType: [0, [Validators.required, this.notZeroValidator('mealType')]],
      difficulty: [
        0,
        [Validators.required, this.notZeroValidator('difficulty')],
      ],
      cookingTime: [
        0,
        [Validators.required, this.notZeroValidator('cookingTime')],
      ],
      servings: [0, [Validators.required, this.notZeroValidator('servings')]],
      dietaryInfo: this.fb.group({
        glutenFree: [false],
        dairyFree: [false],
        vegetarian: [false],
        vegan: [false],
      }),
      nutrition: this.fb.group({
        calories: [
          0,
          [Validators.required, this.notZeroValidator('calories', 'nutrition')],
        ],
        protein: [
          0,
          [Validators.required, this.notZeroValidator('calories', 'nutrition')],
        ],
        carbohydrates: [
          0,
          [Validators.required, this.notZeroValidator('calories', 'nutrition')],
        ],
        fat: [
          0,
          [Validators.required, this.notZeroValidator('calories', 'nutrition')],
        ],
        fiber: [
          0,
          [Validators.required, this.notZeroValidator('calories', 'nutrition')],
        ],
      }),
      recipeImg: [null, [Validators.required]],
      categories: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)]
      ),
      cuisines: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1), Validators.maxLength(5)]
      ),
      ingredients: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
      ),
    });
  }

  private notZeroValidator(property: string, parentProperty?: string) {
    return (control: AbstractControl) => {
      let value;

      if (parentProperty && control.root.get(parentProperty)) {
        const parentControl = control.root.get(parentProperty) as FormGroup;

        value = parentControl.get(property)?.value;
      } else {
        value = control.root.get(property)?.value;
      }

      if (value !== null && value !== undefined && value !== 0) {
        return null;
      } else {
        return { notZero: true };
      }
    };
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.uploadForm.patchValue({ recipeImg: file });
  }

  onSubmitUpload() {
    console.log(this.uploadForm.value);

    this.uploadForm.reset();
    (<FormArray>this.uploadForm.get('categories')).clear();
    (<FormArray>this.uploadForm.get('ingredients')).clear();
    (<FormArray>this.uploadForm.get('cuisines')).clear();
  }

  get cusinesFormArray(): FormArray {
    return this.uploadForm.get('cuisines') as FormArray;
  }

  get categoriesFormArray(): FormArray {
    return this.uploadForm.get('categories') as FormArray;
  }

  get ingredientsFormArray(): FormArray {
    return this.uploadForm.get('ingredients') as FormArray;
  }

  onAddControl(event: Event, formArray: string) {
    event.preventDefault();

    if (formArray !== 'ingredients') {
      const control = this.fb.control(0, Validators.required);
      (<FormArray>this.uploadForm.get(formArray)).push(control);
    } else if (formArray === 'ingredients') {
      const control = this.fb.group({
        selectedIngredient: [0, Validators.required],
        quantity: ['', Validators.required],
      });
      (<FormArray>this.uploadForm.get(formArray)).push(control);
    }

    // this.uploadBtnDisabled = false;

    this.checkFormArrays(this.uploadForm.value.categories);
    this.checkFormArrays(this.uploadForm.value.cuisines);
    this.checkFormArrays(this.uploadForm.value.ingredients);
  }

  private checkFormArrays(arr: number[]) {
    arr.forEach((category: number) =>
      +category === 0
        ? (this.uploadBtnDisabled = true)
        : (this.uploadBtnDisabled = false)
    );
  }

  onRemoveControl(event: Event, formArray: string) {
    event.preventDefault();

    (<FormArray>this.uploadForm.get(formArray)).removeAt(
      (<FormArray>this.uploadForm.get(formArray)).length - 1
    );
  }

  onIngredientChange(event: Event | null, i: number) {
    if (!event) return;

    const control = (<FormArray>this.uploadForm.get('ingredients')).at(i);
    const selectedIngredientId = (<HTMLSelectElement>event.target).value;

    this.recipeService.getIngredientById(+selectedIngredientId).subscribe({
      next: (ingredient) => {
        if (ingredient) {
          this.elementRef.nativeElement.querySelector(
            `#quantity-label${i}`
          ).innerText = ingredient.quantity_type;
        }
      },
      error: (err) => console.error(err),
    });
  }
}
