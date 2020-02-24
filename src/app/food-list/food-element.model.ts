import { Food } from '../food/food.model';


export interface FoodElement {
  fdcId: number;
  category: string;
  iconUrl: string;
  position: number;
  weight: number;
  name: string;
}
