import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodNutrientListComponent } from './food-nutrient-list.component';

describe('FoodNutrientListComponent', () => {
  let component: FoodNutrientListComponent;
  let fixture: ComponentFixture<FoodNutrientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodNutrientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodNutrientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
