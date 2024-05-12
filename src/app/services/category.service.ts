import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
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

  getMealTypes(): Observable<IMealTypeDto[]> {
    return this.dataService.get('mealTypes.json');
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
}
