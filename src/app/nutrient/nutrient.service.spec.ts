import { TestBed } from '@angular/core/testing';

import { NutrientService } from './nutrient.service';

describe('NutrientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NutrientService = TestBed.get(NutrientService);
    expect(service).toBeTruthy();
  });
});
