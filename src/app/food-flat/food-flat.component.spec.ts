import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodFlatComponent } from './food-flat.component';

describe('FoodFlatComponent', () => {
  let component: FoodFlatComponent;
  let fixture: ComponentFixture<FoodFlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodFlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodFlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
