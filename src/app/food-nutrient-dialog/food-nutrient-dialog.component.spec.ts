import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodNutrientDialogComponent } from './food-nutrient-dialog.component';

describe('FoodNutrientDialogComponent', () => {
  let component: FoodNutrientDialogComponent;
  let fixture: ComponentFixture<FoodNutrientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodNutrientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodNutrientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
