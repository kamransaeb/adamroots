import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodNutrientComponent } from './food-nutrient.component';

describe('FoodNutrientComponent', () => {
  let component: FoodNutrientComponent;
  let fixture: ComponentFixture<FoodNutrientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodNutrientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodNutrientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
