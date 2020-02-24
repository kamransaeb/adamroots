import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { MaterialModule } from './material/material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertModule } from './alert/alert.module';
import { FoodComponent } from './food/food.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FoodSearchComponent } from './food-search/food-search.component';
import { CustomPaginationComponent } from './custom-pagination/custom-pagination.component';
import { SortableComponent } from './sortable/sortable.component';
import { FoodPortionComponent } from './food-portion/food-portion.component';
import { FoodNutrientComponent } from './food-nutrient/food-nutrient.component';
import { FoodNutrientDialogComponent } from './food-nutrient-dialog/food-nutrient-dialog.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FoodNutrientListComponent } from './food-nutrient-list/food-nutrient-list.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodListDeleteDialogComponent } from './food-list-delete-dialog/food-list-delete-dialog.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { FoodListAssessmentDialogComponent } from './food-list-assessment-dialog/food-list-assessment-dialog.component';
import { FoodFlatComponent } from './food-flat/food-flat.component';
import { NutrientComponent } from './nutrient/nutrient.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SidenavComponent,
    WelcomeComponent,
    ProfileComponent,
    ErrorComponent,
    FoodComponent,
    ProfileDetailComponent,
    ProfileSearchComponent,
    FoodDetailComponent,
    FoodSearchComponent,
    CustomPaginationComponent,
    SortableComponent,
    FoodPortionComponent,
    FoodNutrientComponent,
    FoodNutrientDialogComponent,
    FoodNutrientListComponent,
    FoodListComponent,
    FoodListDeleteDialogComponent,
    FoodListAssessmentDialogComponent,
    FoodFlatComponent,
    NutrientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    NgxChartsModule,
    ScrollToModule.forRoot()
  ],
  entryComponents: [
    FoodNutrientDialogComponent,
    FoodListDeleteDialogComponent,
    FoodListAssessmentDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
