import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { ICategoryDto } from '../common/interfaces/category/category.interface';
import { IMealTypeDto } from '../common/interfaces/category/meal-type.interface';
import { IDifficultyCookingDto } from '../common/interfaces/category/difficulty-cooking.interface';
import { ICookingTimeDto } from '../common/interfaces/category/cooking-time.interface';
import { ICuisineDto } from '../common/interfaces/category/cuisine.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private dataService: DataService) {}

  getCategories(): Observable<ICategoryDto[]> {
    return this.dataService.get('categories.json');
  }

  getCategoriesByIds(ids: number[]): Observable<ICategoryDto[]> {
    return this.dataService
      .get<ICategoryDto[]>('categories.json')
      .pipe(map((categories) => this.getCategoriesAndSubcategories(categories, ids)));
  }

  getMealTypes(): Observable<IMealTypeDto[]> {
    return this.dataService.get('mealTypes.json');
  }

  getMealTypeById(id: number): Observable<IMealTypeDto | undefined> {
    return this.dataService
      .get<IMealTypeDto[]>('mealTypes.json')
      .pipe(map((mealTypes) => mealTypes.find((mt) => mt.id === id)));
  }

  getDifficultyCooking(): Observable<IDifficultyCookingDto[]> {
    return this.dataService.get('difficulty-cooking.json');
  }

  getCookingTimes(): Observable<ICookingTimeDto[]> {
    return this.dataService.get('cooking-time.json');
  }

  getCuisines(): Observable<ICuisineDto[]> {
    return this.dataService.get('tags.json');
  }

  getCuisinesByIds(ids: number[]): Observable<ICuisineDto[]> {
    return this.dataService
      .get<ICuisineDto[]>('tags.json')
      .pipe(map((cuisines) => cuisines.filter((c) => ids.includes(c.id))));
  }

  // Private methods
  private getCategoriesAndSubcategories(categories: ICategoryDto[], ids: number[]): ICategoryDto[]{
    const result: ICategoryDto[] = [];

    function search(categories: ICategoryDto[], ids: number[]) {
      for (const category of categories) {
        if (ids.includes(category.id)) {
          result.push(category);
        }
        if (category.subcategories) {
          search(category.subcategories, ids);
        }
      }
    }

    search(categories, ids);
    return result;
  }
}
