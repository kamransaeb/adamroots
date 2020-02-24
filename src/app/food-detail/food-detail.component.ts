import { Component, OnInit, Input } from '@angular/core';
import { Food } from '../food/food.model';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {

  @Input()
  Food: Food;

  constructor() { }

  ngOnInit() {
  }

}
