import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICategoryDto } from '../../../common/interfaces/category/category.interface';
import { IMealTypeDto } from '../../../common/interfaces/category/meal-type.interface';
import { CategoryService } from '../../../services/category.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-category-showcase',
  templateUrl: './category-showcase.component.html',
  styleUrl: './category-showcase.component.css',
})
export class CategoryShowcaseComponent implements OnInit, OnDestroy {
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

  caategories: ICategoryDto[] = [];
  mealTypes: IMealTypeDto[] = [];
  categoriesAndMealTypes: (ICategoryDto | IMealTypeDto)[] = [];
  subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCatAndMealTypesArr();
  }

  getCatAndMealTypesArr() {
    this.subscriptions.push(
      this.categoryService
        .getCategories()
        .pipe(
          switchMap((categories) => {
            this.categoriesAndMealTypes = categories;

            return this.categoryService.getMealTypes();
          })
        )
        .subscribe({
          next: (mealTypes) =>
            (this.categoriesAndMealTypes = [
              ...this.categoriesAndMealTypes,
              ...mealTypes,
            ]),
          error: (err) => console.error(err),
        })
    );
  }

  getImagePath(category: ICategoryDto | IMealTypeDto): string {
    if ((category as ICategoryDto).subcategories) {
      return `../../../../assets/images/categories/${category.image}`;
    } else {
      return `../../../../assets/images/meal-types/${category.image}`;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
