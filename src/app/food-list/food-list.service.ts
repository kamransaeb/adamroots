import { Injectable } from '@angular/core';
import { Food } from '../food/food.model';
import { BehaviorSubject } from 'rxjs';
import { FoodElement } from './food-element.model';


@Injectable({
  providedIn: 'root'
})
export class FoodListService {

  private _foodList = new BehaviorSubject<FoodElement[]>([]);
  private dataStore: { foodList: FoodElement[] } = { foodList: [] };
  readonly foodList = this._foodList.asObservable();

  constructor() { }

  public addFoodToList(food: Food, foodPosition: number, foodAmount: number) {

    console.log("food-list.service addFoodToList: " + food.category);
    console.log("food-list.service addFoodToList: " + food.fdcId);
    console.log("food-list.service addFoodToList: " + food.name);
    console.log("food-list.service addFoodToList: " + food.name);
    console.log("food-list.service addFoodToList: " + foodPosition);
    console.log("food-list.service addFoodToList: " + foodAmount);


    let foodElement  = {

      name: food.name.split(',',1).toString(),
      fdcId: food.fdcId,
      category: food.category,
      iconUrl: food.iconUrl,
      position: foodPosition,
      weight: foodAmount
    };

    //foodElement.weight = food.name;

    // this.foodList.push(food);
    this.addFood(foodElement);
  }

  getFoodList() {
    return this.foodList;
  }

  addFood(foodElement: FoodElement) {

    this.dataStore.foodList.push(foodElement);
    this._foodList.next(Object.assign({}, this.dataStore).foodList);
  }

  deleteFood(foodPosition: number) {
      this.dataStore.foodList.forEach((f, i) => {
        if (f.position === foodPosition) { this.dataStore.foodList.splice(i, 1); }
      });
      this._foodList.next(Object.assign({}, this.dataStore).foodList);
  }
}
