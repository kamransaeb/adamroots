import { TestBed } from '@angular/core/testing';

import { FoodNutrientListService } from './food-nutrient-list.service';

describe('FoodNutrientListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodNutrientListService = TestBed.get(FoodNutrientListService);
    expect(service).toBeTruthy();
  });
});
