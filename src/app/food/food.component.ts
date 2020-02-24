import { Component, OnInit } from '@angular/core';
import { FoodService } from './food.service';
import { Page } from '../custom-pagination/page.model';
import { CustomPaginationService } from '../custom-pagination/custom-pagination.service';
import { SortableService } from '../sortable/sortable.service';
import { SortableColumn } from '../sortable/sortable.model';
import { Food } from './food.model';

@Component({
  selector: 'app-ood',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  foods: Food[];
  page: Page<Food> = new Page();
  srotableColumns: Array<SortableColumn> = [
    // modify sortable column names
    new SortableColumn('name', 'Name', 'asc')
  ];

  constructor(private foodService: FoodService,
              private customPaginationService: CustomPaginationService,
              private sortableService: SortableService) { }

  ngOnInit() {
    // this.getFoods();
    this.getData();
  }

  // getFoods(): void {
  //   this.FoodService.getFoods()
  //     .subscribe(
  //       Foods => this.Foods = Foods
  //     );
  // }

  add(name: string) {
    name = name.trim();
    if (!name) {
      return;
    }

    this.foodService.addFood({ name } as Food)
      .subscribe(
        food => {
          this.foods.push(food);
        }
      );
  }

  delete(food: Food) {
    this.foodService.deleteFood(food).subscribe();
    this.foods = this.foods.filter(p => p !== food);
  }

  // handle pagination component events

  public getNextPage(): void {
    this.page.pageable = this.customPaginationService.getNextPage(this.page);
    this.getData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.customPaginationService.getPreviousPage(this.page);
    this.getData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.customPaginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
  }

  private getData(): void {
    const column = this.sortableService.getSortableColumn(this.srotableColumns);
    this.foodService.getPage(this.page.pageable, column).subscribe(
      page => this.page = page
    );
  }

  public sort(sortableColumn: SortableColumn): void {
    this.sortableService.clearPreviousSorting(sortableColumn, this.srotableColumns);
    this.getData();
  }
}
