import { LostObject } from './lost-object.model';
import { CategoryAttribute } from './category-atributes-model';

export interface AttributesObject {
  object_id: number | LostObject;
  category_attribute_id: number | CategoryAttribute;
  value: string;
}
