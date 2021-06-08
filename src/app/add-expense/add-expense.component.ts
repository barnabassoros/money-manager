import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

import { CategoryService } from '../services/category.service';
import { ExpenseService } from '../services/expense.service';
import { Expense } from '../Expense';
import { Category } from '../Category';



@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  ctg: string;
  categoryFormControl = new FormControl('', [Validators.required]);
  amountFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  expense:Expense = {
    id:0,
    date:new Date(),
    description:"",
    amount:0,
    categoryID:-1,
    categoryName:"",
    userId:0,
    userName:""
  };
  

  expenses:Expense[];
  categories:Category[] = [];

  constructor(public snackBar:MatSnackBar,private categoryService: CategoryService,private expenseService: ExpenseService) { }

  

  ngOnInit()
  {
    this.getCategories();
  }
  

  getCategories(): void {
    this.categoryService.getAll().subscribe((data:Category[]) => { 
      this.categories=data;
    })
  }
expenseSubmit = (): void =>
{
  //ctgName = this.categoryService.getCategoryById(this.ctg);
  this.expense.date=this.dateFormControl.value;
  this.expense.amount=this.amountFormControl.value;
  this.expense.description=this.descriptionFormControl.value;
  this.expense.categoryID=this.categoryFormControl.value;


  this.expenseService.create(this.expense)
                    .subscribe();
  this.snackBar.open('Expense added', '', {
    duration:2000,
  });
  }
}
