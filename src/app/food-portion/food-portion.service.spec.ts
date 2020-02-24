import { TestBed } from '@angular/core/testing';

import { FoodPortionService } from './food-portion.service';

describe('FoodPortionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodPortionService = TestBed.get(FoodPortionService);
    expect(service).toBeTruthy();
  });
});
