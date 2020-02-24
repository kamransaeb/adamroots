import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FoodNutrientService } from "../food-nutrient/food-nutrient.service";
import { FoodNutrient, Detail } from "../food-nutrient/food-nutrient.model";
import { element } from "protractor";

@Component({
  selector: "app-food-nutrient-dialog",
  templateUrl: "./food-nutrient-dialog.component.html",
  styleUrls: ["./food-nutrient-dialog.component.css"]
})
export class FoodNutrientDialogComponent implements OnInit {
  public foodNutrients: Array<FoodNutrient> = [];
  public foodNutrientsChartMacronutrient: Array<FoodNutrientChart> = [];
  public foodNutrientsChartMinerals: Array<FoodNutrientChart> = [];
  public foodNutrientsChartVitamins: Array<FoodNutrientChart> = [];

  public amountCoefficient: any;

  public isLoading = true;
  public showNutrients = false;

  public viewMacronutrients: any[]; // = [760, 120];
  public viewVitamins: any[]; // = [760, 220];
  public viewMinerals: any[]; // = [760, 240];

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  //public showXAxisLabel = true;
  //public xAxisLabel = "Country";
  //public showYAxisLabel = true;
  //public yAxisLabel = "Sales";
  public timeline = true;
  public colorScheme = {
    domain: ["#78c58c"]
  };
  //pie
  public showLabels = true;


  constructor(
    public dialogRef: MatDialogRef<FoodNutrientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private foodNutrientService: FoodNutrientService
  ) {}

  ngOnInit() {
    this.amountCoefficient = this.data[1];
    this.getFoodNutrients(this.data[0]);
  }

  closeDialog() {
    this.dialogRef.close("Pizza!");
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  getFoodNutrients(fdcId: number) {
    this.foodNutrientService.getFoodNutrients(fdcId).subscribe(
      (data: FoodNutrient[]) => {
        //foodNutrientsChart.push();

        data.forEach((element: FoodNutrient) => {
          element.details.forEach((detail: Detail) => {
            if (element.category === "Minerals") {
              this.foodNutrientsChartMinerals.push(
                new FoodNutrientChart(
                  detail.name + " " + detail.unitName,
                  (detail.amount * this.amountCoefficient) / 100
                )
              );
              this.viewMinerals = [760, 30 * element.details.length];
            } else if (element.category === "Vitamins") {
              this.foodNutrientsChartVitamins.push(
                new FoodNutrientChart(
                  detail.name + " " + detail.unitName,
                  (detail.amount * this.amountCoefficient) / 100
                )
              );
              this.viewVitamins = [760, 30 * element.details.length];
            } else {
              this.foodNutrientsChartMacronutrient.push(
                new FoodNutrientChart(
                  detail.name + " " + detail.unitName,
                  (detail.amount * this.amountCoefficient) / 100
                )
              );
              this.viewMacronutrients = [760, 30 * element.details.length];
            }
          });
        });
        // this.foodNutrients = data;
        this.isLoading = false;
        this.showNutrients = true;
        // this.disableDoneFoodButton = true;
      },
      error => {
        console.log("error in getFoodNutrients is " + error);
      }
    );
  }
}

export class FoodNutrientChart {
  public name: string;
  public value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
