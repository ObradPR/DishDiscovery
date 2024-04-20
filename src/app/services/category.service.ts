import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { ICategoryDto } from '../common/interfaces/category/category.interface';
import { IMealTypeDto } from '../common/interfaces/category/meal-type.interface';

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
}
