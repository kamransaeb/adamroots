import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { FoodFlat } from './food-flat.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodFlatService {

  private foodFlatUrl = `${API_URL}/api/foodflat`;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService
  ) { }

  getFoodFlats(foodIds: number[]): Observable<FoodFlat[]> {
    this.log("trying to call getFoodFlats()");
    return this.httpClient.get<FoodFlat[]>(this.foodFlatUrl).pipe(
    //  share(),
      tap(_ => this.log("fetched Foods")),
      catchError(this.handleError<FoodFlat[]>("getFoodFlats", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      this.alertService.error(error.message, "food-flat-alert");
      return of(result as T);
    };
  }

  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`FoodFlatService: ${message}`);
  }

}
