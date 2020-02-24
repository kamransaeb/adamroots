import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FoodElement } from '../food-list/food-element.model';
import { FoodNutrientService } from '../food-nutrient/food-nutrient.service';
import { FoodNutrient, Detail } from '../food-nutrient/food-nutrient.model';

@Component({
  selector: 'app-food-list-assessment-dialog',
  templateUrl: './food-list-assessment-dialog.component.html',
  styleUrls: ['./food-list-assessment-dialog.component.css']
})
export class FoodListAssessmentDialogComponent implements OnInit {

  constructor(public foodNutrientService: FoodNutrientService,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    public dialogRef: MatDialogRef<FoodListAssessmentDialogComponent>
    ) {}

  public genderList: any = [
    { genderName: 'Infants' ,
      periodList: ['0-6 mo', '7-12 mo']
    },
    { genderName: 'Children' ,
      periodList: ['1-3 y', '4-8 y']
    },
    { genderName: 'Males' ,
      periodList: ['9-13 y', '14-18 y', '19-30 y', '31-50 y', '51-70 y', '>70 y']
    },
    { genderName: 'Females' ,
      periodList: ['9-13 y', '14-18 y', '19-30 y', '31-50 y', '51-70 y', '>70 y']
    },
    { genderName: 'Pregnancy' ,
      periodList: ['<19 y', '19-30 y', '31-50 y', '31-50 y']
    },
    { genderName: 'Lactation' ,
      periodList: ['<19 y', '19-30 y', '31-50 y', '31-50 y']
    }
  ];
  public periodList = [];
  public genderSelection;
  public periodSelection;
  public visibilityButton = false;
  public isLoading = false;
  public showNutrients = false;
  public foodList: FoodElement[] = [];

  public foodNutrientsChartMacronutrient: Array<FoodNutrientChart> = [];
  public foodNutrientsChartMinerals: Array<FoodNutrientChart> = [];
  public foodNutrientsChartVitamins: Array<FoodNutrientChart> = [];


  public viewMacronutrients: any[]; // = [760, 120];
  public viewVitamins: any[]; // = [760, 220];
  public viewMinerals: any[]; // = [760, 240];

  ngOnInit() {
    this.foodList = this.data[0];
  }

  closeDialog() {
    this.dialogRef.close("Pizza!");
  }

  genderListChangeAction(gender: any) {

    this.periodSelection = '';
    const dropDownData = this.genderList.find((data: any) => data.genderName === gender);
    if (dropDownData) {
      this.periodList = dropDownData.periodList;
      if (this.periodList) {
        this.periodSelection = this.periodList[0];
      }
      this.visibilityButton = true;
    } else {
      this.periodList = [];
      this.visibilityButton = false;
    }

  }

  getFoodListNutrients() {
    this.isLoading = true;

    let foodIds = [];
    this.foodList.forEach( (foodElement: FoodElement) => {
      foodIds.push(foodElement.fdcId);
    });
    // this.foodNuti
    this.foodNutrientService.getFoodListNutrients(foodIds, this.genderSelection, this.periodSelection).subscribe(
      (data: FoodNutrient[]) => {
        console.log(data);


        data.forEach((element: FoodNutrient) => {
          element.details.forEach((detail: Detail) => {
            if (element.category === "Minerals") {


              this.foodNutrientsChartMinerals.push(
                new FoodNutrientChart(
                  detail.name + " " + detail.unitName,
                  (detail.amount
                   // * this.amountCoefficient
                    ) / 100
                )
              );

              this.viewMinerals = [760, 30 * element.details.length];



            } else if (element.category === "Vitamins") {
              this.foodNutrientsChartVitamins.push(
                new FoodNutrientChart(
                  detail.name + " " + detail.unitName,
                  (detail.amount
                     // * this.amountCoefficient
                     ) / 100
                )
              );
              this.viewVitamins = [760, 30 * element.details.length];
            } else {
              this.foodNutrientsChartMacronutrient.push(
                new FoodNutrientChart(
                  detail.name + " " + detail.unitName,
                  (detail.amount
                    // * this.amountCoefficient
                    ) / 100
                )
              );
              this.viewMacronutrients = [760, 30 * element.details.length];
            }
          });
        });



        this.isLoading = false;
      },
      error => {
        console.log("error in getFoodListNutrients is " + error);
      }
    );


  }

//   getFoodNutrients(fdcId: number) {
//     this.foodNutrientService.getFoodNutrients(fdcId).subscribe(
//       (data: FoodNutrient[]) => {
//         //foodNutrientsChart.push();

//         data.forEach((element: FoodNutrient) => {
//           element.details.forEach((detail: Detail) => {
//             if (element.category === "Minerals") {
//               this.foodNutrientsChartMinerals.push(
//                 new FoodNutrientChart(
//                   detail.name + " " + detail.unitName,
//                   (detail.amount * this.amountCoefficient) / 100
//                 )
//               );
//               this.viewMinerals = [760, 30 * element.details.length];
//             } else if (element.category === "Vitamins") {
//               this.foodNutrientsChartVitamins.push(
//                 new FoodNutrientChart(
//                   detail.name + " " + detail.unitName,
//                   (detail.amount * this.amountCoefficient) / 100
//                 )
//               );
//               this.viewVitamins = [760, 30 * element.details.length];
//             } else {
//               this.foodNutrientsChartMacronutrient.push(
//                 new FoodNutrientChart(
//                   detail.name + " " + detail.unitName,
//                   (detail.amount * this.amountCoefficient) / 100
//                 )
//               );
//               this.viewMacronutrients = [760, 30 * element.details.length];
//             }
//           });
//         });
//         // this.foodNutrients = data;
//         this.isLoading = false;
//         this.showNutrients = true;
//         // this.disableDoneFoodButton = true;
//       },
//       error => {
//         console.log("error in getFoodNutrients is " + error);
//       }
//     );
//   }
// }


}

export class FoodNutrientChart {
  public name: string;
  public value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
