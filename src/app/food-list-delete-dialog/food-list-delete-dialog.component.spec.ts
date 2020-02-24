import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListDeleteDialogComponent } from './food-list-delete-dialog.component';

describe('FoodListDeleteDialogComponent', () => {
  let component: FoodListDeleteDialogComponent;
  let fixture: ComponentFixture<FoodListDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodListDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
