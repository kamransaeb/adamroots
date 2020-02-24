import { TestBed } from '@angular/core/testing';

import { FoodFlatService } from './food-flat.service';

describe('FoodFlatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodFlatService = TestBed.get(FoodFlatService);
    expect(service).toBeTruthy();
  });
});
