import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ListComponent } from './list/list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryManagerComponent } from './category-manager/category-manager.component';
import { StatisticsComponent } from './statistics/statistics.component'; 

const routes: Routes = [
  { path:'add-income', component: AddIncomeComponent},
  { path:'add-expense', component: AddExpenseComponent},
  { path:'list', component: ListComponent},
  { path:'category-manager', component:CategoryManagerComponent},
  { path:'statistics', component:StatisticsComponent},
  { path: '', redirectTo:'/list', pathMatch:'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
