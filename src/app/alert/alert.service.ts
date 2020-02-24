import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Alert, AlertType } from './alert.model';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false;
        } else {
            this.clear();
        }
      }
    });
  }

  // main alert method
  alert(alert: Alert) {
      this.keepAfterRouteChange = alert.keepAfterRouteChange;
      this.subject.next(alert);
  }

  clear(alertId?: string) {
      this.subject.next(new Alert({ alertId }));
  }

  success(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Success, alertId }));
  }

  error(message: string, alertId?: string) {
    console.log("in alert service :" +  message);
    this.alert(new Alert({ message, type: AlertType.Error, alertId }));
  }

  info(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Info, alertId }));
  }

  warn(message: string, alertId?: string) {
    this.alert(new Alert({ message, type: AlertType.Warning, alertId }));
  }

  onAlert(alertId?: string): Observable<Alert> {
      return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
  }
}
