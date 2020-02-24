export interface FoodNutrient {

  category: string;
  // amount: number;
  // name: string;
  // unitName: string;
  details: Detail[];
}

export interface Detail {
  amount: number;
  name: string;
  unitName: string;
}
