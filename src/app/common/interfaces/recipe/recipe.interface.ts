import { IDietaryInfoDto } from './dietary-info.interface';
import { IIngredientDto } from './ingredient.interface';
import { INutritionDto } from './nutrition.interface';
import { IRatingDto } from './rating.interface';

export interface IRecipeDto {
  id: number;
  title: string;
  categories: number[];
  meal_type: number;
  user_id: number;
  tags: number[];
  description: string;
  image: string;
  cooking_time: string;
  servings: number;
  difficulty: string;
  dietary_info: IDietaryInfoDto;
  ingredients: IIngredientDto[];
  instructions: string[];
  nutrition: INutritionDto;
  ratings: IRatingDto[];
  featured: boolean;
}
