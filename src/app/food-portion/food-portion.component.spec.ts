import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPortionComponent } from './food-portion.component';

describe('FoodPortionComponent', () => {
  let component: FoodPortionComponent;
  let fixture: ComponentFixture<FoodPortionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodPortionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodPortionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
