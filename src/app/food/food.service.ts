import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { Observable, of, throwError } from "rxjs";
import { catchError, tap, retry, share } from 'rxjs/operators';
import { AlertService } from "src/app/alert/alert.service";
import { Pageable } from "src/app/custom-pagination/pageable.model";
import { Page } from "src/app/custom-pagination/page.model";
import { SortableColumn } from "src/app/sortable/sortable.model";
import { Food } from "./food.model";

@Injectable({
  providedIn: "root"
})
export class FoodService {
  private foodUrl = `${API_URL}/api/food`;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) {}

  // findFoodByName(FoodName: any) {
  //   console.log("trying to send a get request with parameter :" + FoodName);
  //   return this.httpClient.get<Food>(`${API_URL}/Food/${FoodName}`)
  //   ;
  // }

  getPage(
    pageable: Pageable,
    sortableColumn: SortableColumn
  ): Observable<Page<Food>> {
    const url =
      this.foodUrl +
      "?page=" +
      pageable.pageNumber +
      "&size=" +
      pageable.pageSize +
      this.getSortableParameters(sortableColumn);
    return this.httpClient.get<Page<Food>>(url, this.httpOptions).pipe(
      tap(_ => this.log("fetched getPageFoods")),
      catchError(
        this.handleError<Page<Food>>("getPageFoods", new Page<Food>())
      )
    );
  }

  private getSortableParameters(sortableColumn: SortableColumn): string {
    if (sortableColumn) {
      return "&sort=foodId";
    }
    return "&sort=" + sortableColumn.name + "," + sortableColumn.direction;
  }

  getFoods(): Observable<Food[]> {
    this.log("trying to call getFoods()");
    return this.httpClient.get<Food[]>(this.foodUrl).pipe(
    //  share(),
      tap(_ => this.log("fetched Foods")),
      catchError(this.handleError<Food[]>("getFoods", []))
    );
  }

  getFood(id: number): Observable<Food> {
    const url = `${this.foodUrl}/${id}`;
    return this.httpClient.get<Food>(url).pipe(
      retry(3),
      tap(_ => this.log(`fetched Food id=${id}`)),
      catchError(this.handleError<Food>(`getFood id=${id}`))
    );
  }

  // check the headers
  updateFood(food: Food): Observable<any> {
    return this.httpClient
      .put(this.foodUrl, food, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated Food id=${food.fdcId}`)),
        catchError(this.handleError<any>(`updateFood id=${food.fdcId}`))
      );
  }

  addFood(food: Food): Observable<Food> {
    return this.httpClient
      .post<Food>(this.foodUrl, Food, this.httpOptions)
      .pipe(
        tap((newFood: Food) =>
          this.log(`added Food id=${newFood.fdcId}`)
        ),
        catchError(this.handleError<Food>(`addFood`))
      );
  }

  deleteFood(food: Food | number): Observable<Food> {
    const id = typeof food === "number" ? food : food.fdcId;
    const url = `${this.foodUrl}/${id}`;

    return this.httpClient.delete<Food>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete food id = ${id}`)),
      catchError(this.handleError<Food>("deletefood"))
    );
  }

  searchFoods(foodName: any): Observable<Food[]> {
    if (!foodName.trim()) {
      return of([]);
    }

    return this.httpClient
      .get<Food[]>(`${this.foodUrl}/${foodName}`)
      .pipe(
        tap(_ => this.log(`found Foods matching ${foodName}`)),
        catchError(this.handleError<Food[]>("searchFoods"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      this.alertService.error(error.message, "food-alert");
      return of(result as T);
    };
  }

  // searchFoods(name: string): Observable<Food[]> {
  //   if (!name.trim()) {
  //     return of([]);
  //   }
  //   return this.httpClient.get<Food[]>(`${this.FoodsUrl}/?name=${name}`).pipe(
  //     tap(_ => this.)
  //   )

  // }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`FoodService: ${message}`);
  }
}
