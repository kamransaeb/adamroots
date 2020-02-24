import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { RouteGuardService } from './service/auth/route-guard.service';
import { FoodDetailComponent } from './food-detail/food-detail.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:name', component: ProfileComponent, canActivate: [RouteGuardService] }, //can accept an array of guards
  { path: 'profile', component: ProfileComponent, canActivate: [RouteGuardService] },
  { path: 'welcome', component: WelcomeComponent }, //canActivate: [RouteGuardService] },
  { path: 'welcome/:username', component: WelcomeComponent }, //canActivate: [RouteGuardService] },
  { path: 'Food/detail/:id', component: FoodDetailComponent },


  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
