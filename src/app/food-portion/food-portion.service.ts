import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { Observable, of } from 'rxjs';
import { FoodPortion } from './food-portion.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodPortionService {
  private foodPortionUrl = `${API_URL}/api/food-portion`;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) { }

  getFoodPortions(fdcId: number): Observable<FoodPortion[]> {
    // if (!foodName.trim()) {
    //   return of([]);
    // }

    return this.httpClient
      .get<FoodPortion[]>(`${this.foodPortionUrl}/${fdcId}`)
      .pipe(
        tap(_ => this.log(`found FoodPortions matching ${fdcId}`)),
        catchError(this.handleError<FoodPortion[]>("searchFoodPortions"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      this.alertService.error(error.message, "food-portion-alert");
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`FoodPortionService: ${message}`);
  }
}
