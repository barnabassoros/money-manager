import { Component, OnInit } from '@angular/core';
import { Income } from '../Income';
import { IncomeService } from '../services/income.service';
import { Expense } from '../Expense';
import { ExpenseService } from '../services/expense.service';
import { Category } from '../Category';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private incomeService:IncomeService, private expenseService:ExpenseService, private categoryService: CategoryService) { }


  incomes: Income[];
  expenses: Expense[];
  categories: Category[];
  sum: number;
  sumOfYear: number;
  sortedExpense: Expense[];
  sortedIncome: Income[];
  pieChartExpenseDataSource: any = {
    "chart": {
      "caption": "Expenses by Category",
      "numberPrefix": "$",
      "theme": "fusion",
      "updateAnimDuration":"0.4"
    },
    "data": []
  };
  barChartExpenseDataSource: any = {
    "chart": {
      "caption": "Expenses over time",
      "yaxisname": "Amount",
      "numberprefix": "$",
      "rotatelabels": "0",
      "setadaptiveymin": "1",
      "theme": "fusion"
    },
    "data": []
  };
  pieChartIncomeDataSource: any = {
    "chart": {
      "caption": "Incomes by Category",
      "numberPrefix": "$",
      "theme": "fusion",
      "updateAnimDuration":"0.4"
    },
    "data": []
  };
  barChartIncomeDataSource: any = {
    "chart": {
      "caption": "Incomes over time",
      "yaxisname": "Amount",
      "numberprefix": "$",
      "rotatelabels": "0",
      "setadaptiveymin": "1",
      "theme": "fusion"
    },
    "data": []
  };

  ngOnInit() {
    this.getData();
  }


  getData() {
    this.incomeService.getAll().subscribe((incomeData: Income[]) => {
      this.incomes = incomeData;
      this.expenseService.getAll().subscribe((expenseData: Expense[]) => {
        this.expenses = expenseData;
        this.categoryService.getAll().subscribe((categoryData: Category[]) => {
          this.categories = categoryData;
          this.expenseByCategory();
          this.expenseOverTime();
          this.incomeByCategory()
          this.incomeOverTime();
        });
      });
    });
  };

  expenseByCategory() {
    this.categories.forEach(element => {
      this.pieChartExpenseDataSource.data.push({label:element.name,value:this.getCategoryExpenseAmount(element)});
    });
  }

  expenseOverTime() {
    this.sortedExpense=this.expenses.sort((a,b)=> {
      return a.date > b.date ? 1 : -1;
    })
    for(var i = this.formatDate(this.sortedExpense[0].date).getFullYear();i<=this.formatDate(this.sortedExpense[this.sortedExpense.length-1].date).getFullYear();i++) {
      this.sumOfYear=0;
      this.sortedExpense.forEach(element => {
        if(this.formatDate(element.date).getFullYear()==i) {
          this.sumOfYear+=element.amount;
        }
      })
      this.barChartExpenseDataSource.data.push({label:i.toString(),value:this.sumOfYear.toString()});
    }
  }

  getCategoryExpenseAmount(cat: Category): number {
    this.sum=0;
    for(var i=0;i<this.expenses.length;i++)
    {
      if(this.expenses[i].categoryID==cat.id)
      {
        this.sum+=this.expenses[i].amount;
      }
    }
    return this.sum;
  }
  getCategoryIncomeAmount(cat: Category): number {
    this.sum=0;
    for(var i=0;i<this.incomes.length;i++)
    {
      if(this.incomes[i].categoryID==cat.id)
      {
        this.sum+=this.incomes[i].amount;
      }
    }
    return this.sum;
  }

  incomeByCategory() {
    this.categories.forEach(element => {
      this.pieChartIncomeDataSource.data.push({label:element.name,value:this.getCategoryIncomeAmount(element)});
    });
  }

  incomeOverTime() {
    this.sortedIncome=this.incomes.sort((a,b)=> {
      return a.date > b.date ? 1 : -1;
    })
    for(var i = this.formatDate(this.sortedIncome[0].date).getFullYear();i<=this.formatDate(this.sortedIncome[this.sortedIncome.length-1].date).getFullYear();i++) {
      this.sumOfYear=0;
      this.sortedIncome.forEach(element => {
        if(this.formatDate(element.date).getFullYear()==i) {
          this.sumOfYear+=element.amount;
        }
      })
      this.barChartIncomeDataSource.data.push({label:i.toString(),value:this.sumOfYear.toString()});
      
    }
  }



  //dátum formázása Date formátumra
  formatDate(date: Date): Date
  {
      let d: Date = new Date();
      if (date instanceof Date) {
        d = date;
      } else {
        d = new Date(date);
      }
      const day = this.pad(d.getDate(), 2);
      const month = this.pad(d.getMonth() + 1, 2);
      const year = this.pad(d.getFullYear(), 4);
      const s = `${year}-${month}-${day}`;
      return new Date(s);
  }

  pad(num: number, size: number)
  {
      const s = '000000000' + num;
      return s.substr(s.length - size);
  }
}


