import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Components
import { MenuComponent } from './menu/menu.component';
import { ListComponent, ChangeIncomeDialog, ChangeExpenseDialog } from './list/list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { CategoryManagerComponent, CategoryManagerDialog, CategoryManagerEditDialog } from './category-manager/category-manager.component';
import { StatisticsComponent } from './statistics/statistics.component';


// FusionCharts
import { FusionChartsModule} from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


import { CookieService } from "angular2-cookie/services/cookies.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddExpenseComponent } from './add-expense/add-expense.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ListComponent,
    PageNotFoundComponent,
    AddIncomeComponent,
    CategoryManagerComponent,
    CategoryManagerDialog,
    CategoryManagerEditDialog,
    ChangeIncomeDialog,
    ChangeExpenseDialog,
    StatisticsComponent,
    AddExpenseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FusionChartsModule,
    HttpClientModule
  ],
  entryComponents: [CategoryManagerDialog,CategoryManagerEditDialog,ChangeIncomeDialog,ChangeExpenseDialog],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
