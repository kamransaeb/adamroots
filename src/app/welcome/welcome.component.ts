import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl
} from "@angular/forms";

import { AlertService } from "../alert/alert.service";
import { WelcomeService } from "./welcome.service";
import { FoodService } from "../food/food.service";
import { debounceTime, switchMap, tap, finalize, filter } from "rxjs/operators";
import { RequireMatch } from "./requireMatch";
import { Food } from "../food/food.model";
import { Observable } from "rxjs";
import { FoodPortionService } from "../food-portion/food-portion.service";
import { FoodPortion } from '../food-portion/food-portion.model';
import { FoodNutrient } from '../food-nutrient/food-nutrient.model';
import { FoodNutrientService } from '../food-nutrient/food-nutrient.service';
import { MatDialog } from '@angular/material/dialog';
import { FoodNutrientDialogComponent } from '../food-nutrient-dialog/food-nutrient-dialog.component';
import { FoodListService } from '../food-list/food-list.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { NutrientService } from '../nutrient/nutrient.service';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit, OnDestroy {
  searchFoodForm: FormGroup;
  foodPortionFormItemArray: FormArray;
  // e.g
  // orderForm: FormGroup;
  // orderFormItemArray: FormArray;
  // spinnerView = false;

  username = "";
  responseFromService: string;
  errorFromService: string;
  message = "Some Welcome Message";
  disableDoneFoodButton = false;
  // autocomplete

  // public searchFoodControl = new FormControl("", [
  //   Validators.required,
  //   RequireMatch
  // ]);


  // null, dummyValidator);
  //public filteredProducts: Observable<Product[]>;
  public filteredFoods: Array<Food> = [];
  public foodList: Array<Food> = [];
  public foodPortions: Array<FoodPortion> = [];
  public foodNutrients: Array<FoodNutrient> = [];



  // products: Array<string> = [];
  public isLoading = false;
  public showDescription = false;
  public showPortions = false;
  public showNutrients = false;
  public showFoodNutrientList = false;
  // public showFoodAgePeriod = false;
  public errorMsg: string;
  public sliderValue = 0;
  private foodListPosition = 0;

  constructor(
    private route: ActivatedRoute,
    // private welcomeService: WelcomeService,
    private foodService: FoodService,
    private foodPortionService: FoodPortionService,
    private foodNutrientService: FoodNutrientService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public foodNutrientDialog: MatDialog,
    private foodListService: FoodListService,
    private _scrollToService: ScrollToService,
    private nutrientService: NutrientService,
  ) {
    this.initNutrientService();
  }

  ngOnInit() {
    this.responseFromService = null;
    this.errorFromService = null;
    this.searchFoodForm = this.createFoodSearchFormGroup(this.formBuilder);
    this.username = this.route.snapshot.params["username"];
    if (this.username == null) {
      this.username = "New Friend";
    }

    this.onChanges();


  }
  createFoodSearchFormGroup(formBuilder: FormBuilder) {

    return formBuilder.group({
      searchFoodControl:
      new FormControl("", [
          Validators.required,
          RequireMatch
        ])
    });
  }

  ngOnDestroy() {
    this.alertService.clear();

  }

  onSubmit() {
    console.log(
      "submit form has been called" +
        this.searchFoodForm.controls["searchFoodControl"].value.fdcId
    );
  }

  // Buttons ...

  reset() {
    this.searchFoodForm.reset();
    this.searchFoodForm.controls['searchFoodControl'].setValue(null);
    this.showDescription = false;
    this.disableDoneFoodButton = false;
    this.showPortions = false;
    this.showNutrients = false;
    this.foodPortions = [];
    this.foodNutrients = [];
    this.sliderValue = 0;

    // this.form.controls['dept'].setValue(selected.id);

  }

  addFoodPortionFormItem(): void {
    this.isLoading = true;
    this.getFoodPortions(
      this.searchFoodForm.controls["searchFoodControl"].value.fdcId
    );
  }

  addFoodToList(): void {
    this.showFoodNutrientList = true;

    this.foodListPosition++;
    this.foodListService.addFoodToList(
      this.searchFoodForm.controls["searchFoodControl"].value,
      this.foodListPosition,
      this.sliderValue);
    this.reset();
    const config: ScrollToConfigOptions = {
      target: 'foodSearchForm'
    };
    this._scrollToService.scrollTo(config);


  }

  openFoodNutrientDialog(): void {
    // this.isLoading = true;
    // this.getFoodNutrients(
    //   this.searchFoodForm.controls["searchFoodControl"].value.fdcId
    // );

    const dialogRef = this.foodNutrientDialog.open(FoodNutrientDialogComponent, {
     // width: '900px',
     // height: '900px',
       data: [this.searchFoodForm.controls["searchFoodControl"].value.fdcId, this.sliderValue]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });

    //dialogRef.close('kamran');

  }

  getFoodPortions(fdcId: number) {
    const config: ScrollToConfigOptions = {
      target: 'showPortions'
    };


    this.foodPortionService.getFoodPortions(fdcId).subscribe((data: FoodPortion[])  => {
      this.foodPortions = data;
      this.isLoading = false;
      this.showPortions = true;
      this.disableDoneFoodButton = true;
      this._scrollToService.scrollTo(config);
    },
    error => {
      console.log('error in getFoodPortions is ' + error);
    });
  }

  getFoodNutrients(fdcId: number) {
    this.foodNutrientService.getFoodNutrients(fdcId).subscribe((data: FoodNutrient[])  => {
      this.foodNutrients = data;
      this.isLoading = false;
      this.showNutrients = true;
      this.disableDoneFoodButton = true;
    },
    error => {
      console.log('error in getFoodNutrients is ' + error);
    });
  }

  createFoodPortionFormItem(foodPortion: FoodPortion): FormGroup {
    const fp = foodPortion.seqNumber.toString();

    return this.formBuilder.group({
      fp : ['', Validators.compose([Validators.required])]
    });
  }

  displayFoodFn(food: Food) {
    if (food) {
      let splitted = food.name.split(",",1);
      return splitted[0];
    }
  }

  formatLabel(value: number) {
    return value + 'g';
  }

  onChanges() {
    this.searchFoodForm.controls["searchFoodControl"].valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredFoods = [];
          this.isLoading = true;
        }),
        filter(x => {
          let result = false;
          if (typeof x === "string") {
            result = true;
          } else {
            this.isLoading = false;
          }
          return result;
        }),
        switchMap(food =>
          this.foodService.searchFoods(food).pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
        )
      )
      .subscribe(data => {
        this.filteredFoods = data;
      });
  }

  initNutrientService() {
    this.nutrientService.initNutrients();
  }

}

