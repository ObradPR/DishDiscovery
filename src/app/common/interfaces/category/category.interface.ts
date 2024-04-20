export interface ISubcategoryDto {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface ICategoryDto {
  id: number;
  name: string;
  description: string;
  image: string;
  subcategories: ISubcategoryDto[];
}
