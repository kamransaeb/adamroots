import { Injectable } from "@angular/core";
import { API_URL } from "../app.constants";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { AlertService } from "../alert/alert.service";
import { Observable, of } from "rxjs";
import { FoodNutrient } from "./food-nutrient.model";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FoodNutrientService {
  private foodNutrientUrl = `${API_URL}/api/food-nutrient`;

  private foodListNutrientsUrl = `${API_URL}/api/food-flat-ndv`;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) {}

  getFoodNutrients(fdcId: number): Observable<FoodNutrient[]> {
    // if (!foodName.trim()) {
    //   return of([]);
    // }

    return this.httpClient
      .get<FoodNutrient[]>(`${this.foodNutrientUrl}/${fdcId}`)
      .pipe(
        tap(_ => this.log(`found FoodPortions matching ${fdcId}`)),
        catchError(this.handleError<FoodNutrient[]>("searchFoodNutrients"))
      );
  }

  getFoodListNutrients(
    fdcIdList: string[],
    gender: string,
    period: string
  ): Observable<FoodNutrient[]> {
    // if (!foodName.trim()) {
    //   return of([]);
    // }

    let params = new HttpParams();

    fdcIdList.forEach(fdcId => {
      params = params.append("foodIds", fdcId);
    });
    params = params.append("gender", gender);
    params = params.append("period", period);

    return this.httpClient
      .get<FoodNutrient[]>(`${this.foodListNutrientsUrl}`, { params })
      .pipe(
        tap(_ => this.log(`found FoodPortions matching`)),
        catchError(this.handleError<FoodNutrient[]>("searchFoodNutrients"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      //this.log(`${operation} failed: ${error.message}`);

      this.alertService.error(error.message, "food-nutrient-alert");
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`FoodNutrientService: ${message}`);
  }
}
