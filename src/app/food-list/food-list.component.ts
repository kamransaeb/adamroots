import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort, MatDialog } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { FoodListService } from "./food-list.service";
import { FoodElement } from "./food-element.model";
import { Food } from "../food/food.model";
import { listLazyRoutes } from "@angular/compiler/src/aot/lazy_routes";
import { FoodListDeleteDialogComponent } from "../food-list-delete-dialog/food-list-delete-dialog.component";
import { FoodFlatService } from '../food-flat/food-flat.service';
import { FoodFlat } from '../food-flat/food-flat.model';
import { FoodListAssessmentDialogComponent } from '../food-list-assessment-dialog/food-list-assessment-dialog.component';

@Component({
  selector: "app-food-list",
  templateUrl: "./food-list.component.html",
  styleUrls: ["./food-list.component.css"]
})
export class FoodListComponent implements OnInit {
  displayedColumns = [
    "select",
    "position",
    "name",
    "weight",
    "category",
    "actions"
  ];
  matDataSource: MatTableDataSource<FoodElement>; // = new MatTableDataSource<FoodElement>();
  private foodDataStore: FoodElement[] = [];

  selection = new SelectionModel<FoodElement>(true, []);

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private foodListService: FoodListService,
    private foodFlatListService: FoodFlatService,
    public deleteFoodDialog: MatDialog,
    public foodListAssessmentDialog: MatDialog
  ) {}

  ngOnInit() {
    console.log("food-list.component");
    this.foodListService.getFoodList().subscribe(dataStore => {
      dataStore.forEach(element => {
        console.log("food-list.component element: " + element.category);
        console.log("food-list.component element: " + element.fdcId);
        console.log("food-list.component element: " + element.iconUrl);
        console.log("food-list.component element: " + element.position);
        //console.log("food-list.component element: " + element.symbol);
        console.log("food-list.component element: " + element.weight);
      });
      this.foodDataStore = dataStore;
      this.matDataSource = new MatTableDataSource<FoodElement>(
        this.foodDataStore
      );
      this.matDataSource.sort = this.sort;
    });

  }

  ngAfterViewInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.matDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.matDataSource.data.forEach(row => this.selection.select(row));
  }

  deleteRecord(position: number) {
    const foodRecord = this.foodDataStore.find(
      object => object.position === position
    );
    console.log("foodRecord.name :" + foodRecord.name);

    // const foodRecord = this.matDataSource.data.find(obj => obj[this.] === position);

    const deleteFoodDialogRef = this.deleteFoodDialog.open(
      FoodListDeleteDialogComponent,
      {
        // width: '900px',
        // height: '900px',
        data: [foodRecord.name, foodRecord.weight]
      }
    );

    deleteFoodDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.foodListService.deleteFood(position);
      }
    });
  }

  assessment() {

    const foodListAssessmentDialogRef = this.foodListAssessmentDialog.open(
      FoodListAssessmentDialogComponent,
      {
        width: '900px',
        height: '900px',
        data: [this.foodDataStore]
      }
    );

    foodListAssessmentDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // this.foodListService.deleteFood(position);
      }
    });

    // let fdcIds = [];
    // this.foodDataStore.forEach((foodElement: FoodElement) => {
    //   fdcIds.push(foodElement.fdcId);
    // });
    // this.foodFlatListService.getFoodFlats(fdcIds).subscribe((data: FoodFlat[]) => {
    //   data.forEach((foodFlat: FoodFlat) => {
    //     console.log(foodFlat.fDescription);
    //   });
    // });


  }
}
