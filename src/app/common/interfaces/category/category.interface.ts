export interface ICategoryDto {
  id: number;
  name: string;
  description: string;
  image: string;
  subcategories?: ICategoryDto[];
}
