export interface FoodNutrient {

  category: string;
  // amount: number;
  // name: string;
  // unitName: string;
  details: Detail[];
}

export interface Detail {
  fDescription: string;
  fnAmount: number;
  nId: number;
  ndvEstAveReq: number;
}
