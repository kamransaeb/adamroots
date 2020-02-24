import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FoodListService } from '../food-list/food-list.service';

@Component({
  selector: 'app-food-list-delete-dialog',
  templateUrl: './food-list-delete-dialog.component.html',
  styleUrls: ['./food-list-delete-dialog.component.css']
})
export class FoodListDeleteDialogComponent implements OnInit {

  private foodName: string;
  private foodWeight: string;


  constructor(
    public dialogRef: MatDialogRef<FoodListDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[],
    private foodListService: FoodListService
  ) { }

  ngOnInit() {
    this.foodName = this.data[0];
    this.foodWeight = this.data[1];
  }


}
