import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListAssessmentDialogComponent } from './food-list-assessment-dialog.component';

describe('FoodListAssessmentDialogComponent', () => {
  let component: FoodListAssessmentDialogComponent;
  let fixture: ComponentFixture<FoodListAssessmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodListAssessmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListAssessmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
