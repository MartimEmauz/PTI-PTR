import { Category } from './category-model';

export interface CategoryAttribute {
  id: number;
  attribute: string;
  category_id: number | Category;
}
