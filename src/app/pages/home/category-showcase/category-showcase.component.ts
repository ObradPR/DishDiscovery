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
  products = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4,
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3,
    },
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4,
    },
  ];

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

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }

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
