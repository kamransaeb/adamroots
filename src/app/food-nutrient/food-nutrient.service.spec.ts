import { TestBed } from '@angular/core/testing';

import { FoodNutrientService } from './food-nutrient.service';

describe('FoodNutrientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodNutrientService = TestBed.get(FoodNutrientService);
    expect(service).toBeTruthy();
  });
});
