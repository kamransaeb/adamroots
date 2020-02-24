import { Injectable, OnInit } from '@angular/core';
import { API_URL } from '../app.constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Nutrient } from './nutrient.model';

@Injectable({
  providedIn: 'root'
})
export class NutrientService {

  private nutrientUrl = `${API_URL}/api/nutrient`;
  private nutrientMap;//: Nutrient[] = [];

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };

  constructor(private httpClient: HttpClient) {
  }

  initNutrients() {
    console.log('initNutrients is called');

    this.getNutrients().subscribe((data: Nutrient[]) => {
      //this.nutrientList = data;

      this.nutrientMap = new Map(data.map(i => [i.nutrientId, i]));

      data.forEach( (nutrient: Nutrient) => {
        console.log('name is ' + nutrient.name);
        console.log('category is ' + nutrient.category);
        console.log('nutrientId is ' + nutrient.nutrientId);
        console.log('unitName is ' + nutrient.unitName);
      });
    });
  }

  getNutrients() {
    return this.httpClient.get<Nutrient[]>(`${this.nutrientUrl}`)
    .pipe(
      tap(_ => this.log(`found nutrients`)),
      catchError(this.handleError<Nutrient[]>("getNutrients"))
    );
  }

  getNutrientMap() {
    return this.nutrientMap;
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      //this.log(`${operation} failed: ${error.message}`);

      //this.alertService.error(error.message, "food-nutrient-alert");
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
    console.log(`NutrientService: ${message}`);
  }

}
