import { Address } from './address.model';
import { Category } from './category-model';

export interface Objeto {
  id?: number;
  title?: string;
  specific_date?: Date;
  start_date?: Date;
  end_date?: Date;
  description?: string;
  category?: number | Category;
  address?: number | Address;
}


//INUTILIZADO ESTE MODEL