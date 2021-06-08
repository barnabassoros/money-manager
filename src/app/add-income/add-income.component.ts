import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { CategoryService } from '../services/category.service';
import { IncomeService } from '../services/income.service';
import { Income } from '../Income';
import { Category } from '../Category';



@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  ctg: string;
  categoryFormControl = new FormControl('', [Validators.required]);
  amountFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('', [Validators.required]);

  income:Income = {
    id:0,
    date:new Date(),
    description:"",
    amount:0,
    categoryID:-1,
    categoryName:"",
    userId:0,
    userName:""
  };
  

  incomes:Income[];
  categories:Category[] = [];

  constructor(public snackBar:MatSnackBar,private categoryService: CategoryService,private incomeService: IncomeService) { }

  

  ngOnInit()
  {
    this.getCategories();
  }
  

  getCategories(): void {
    this.categoryService.getAll().subscribe((data:Category[]) => { 
      this.categories=data;
    })
  }
  incomeSubmit = (): void =>
  {
    this.income.date=this.dateFormControl.value;
    this.income.amount=this.amountFormControl.value;
    this.income.description=this.descriptionFormControl.value;
    this.income.categoryID=this.categoryFormControl.value;


    this.incomeService.create(this.income)
                      .subscribe();
    this.snackBar.open('Income added', '', {
      duration:2000,
    });
    }
}
