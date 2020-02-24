import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn()) {
      console.log("Can activated returns true");
      return true;
    }
    console.log("route guarde is redirecting with :" + state.url);
    this.router.navigate(['login'], {queryParams: {'redirectURL': state.url} });
    return false;
  }
}
