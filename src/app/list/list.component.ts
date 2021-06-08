import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { IncomeService } from '../services/income.service';
import { Income } from '../Income';
import { ExpenseService } from '../services/expense.service';
import { Expense} from '../Expense';
import { CategoryService } from '../services/category.service';
import { Category } from '../Category';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit
{
  constructor(private incomeService: IncomeService,private expenseService: ExpenseService,private categoryService:CategoryService, public dialog: MatDialog)
  {}




  incomes: Income[] = [];
  expenses: Expense[] = [];

  isIncomeDataReady: boolean = false;
  isExpenseDataReady: boolean = false;
  isTransactionDataReady: boolean = false;

  displayedColumns: string[] = ['description', 'date', 'categoryName', 'amount', 'edit', 'delete'];

  incomeDataSource = new MatTableDataSource();
  expenseDataSource = new MatTableDataSource();

  ngOnInit() {
    this.getIncomeData();
    this.getExpenseData();
    
  }

  getIncomeData = (): void =>
  {
    this.incomeService.getAll().subscribe((data: Income[]) => {
      this.incomes = data;
      this.incomeDataSource=new MatTableDataSource(this.incomes);
      this.isIncomeDataReady = true;
    });
  }

  getExpenseData():void {
    this.expenseService.getAll().subscribe((data: Expense[]) => {
      this.expenses=data;
      this.expenseDataSource=new MatTableDataSource(this.expenses);
      this.isExpenseDataReady=true;
    })
  }

  applyIncomeFilter = (filterValue: string): void =>
  {
    this.incomeDataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteIncome(id) {
    this.incomeService.delete(id).subscribe( () => {
      this.incomes = this.incomes.filter(x => x.id !== id);
      this.incomeDataSource=new MatTableDataSource(this.incomes);
    });
  }

   updateIncome(changeIncome) {
    this.openIncomeDialog(changeIncome);
  }

  deleteExpense(id) {
    this.expenseService.delete(id).subscribe(() => {
      this.expenses= this.expenses.filter(x => x.id!== id);
      this.expenseDataSource= new MatTableDataSource(this.expenses);
    });
  }

   updateExpense(changeExpense) {
    this.openExpenseDialog(changeExpense);
  }

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

  openIncomeDialog(changeIncome: Income): void {
    const dialogRef = this.dialog.open(ChangeIncomeDialog, {
      width: '400px',
      data: {
        ...changeIncome,
        date: this.formatDate(changeIncome.date),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null)
      {
        this.incomeService.update(result).subscribe(() => {
          this.incomes[this.incomes.indexOf(changeIncome)] = result;
          this.incomeDataSource=new MatTableDataSource(this.incomes);
        });
      }
    })
  }
  openExpenseDialog(changeExpense: Expense): void {
    const dialogRef = this.dialog.open(ChangeExpenseDialog, {
      width: '400px',
      data: {
        ...changeExpense,
        date: this.formatDate(changeExpense.date),
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null)
      {
        this.incomeService.update(result).subscribe(() => {
          this.expenses[this.expenses.indexOf(changeExpense)] = result;
          this.expenseDataSource=new MatTableDataSource(this.expenses);
        });
      }
    })
  }
}


@Component({
  selector:'changeIncomeDialog',
  templateUrl:'changeIncome-dialog.html',
  styleUrls: ['changeIncome-dialog.css']
})
export class ChangeIncomeDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangeIncomeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Income, private categoryService:CategoryService) {}

    categories: Category[] = [];

    getCategories():void {
      this.categoryService.getAll().subscribe((dat:Category[]) => {
        this.categories=dat;
      });
    }
    
    ngOnInit() {
      this.getCategories();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector:'changeExpenseDialog',
  templateUrl:'changeExpense-dialog.html',
  styleUrls: ['changeExpense-dialog.css']
})
export class ChangeExpenseDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangeExpenseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Income, private categoryService:CategoryService) {}

    categories: Category[] = [];

    getCategories():void {
      this.categoryService.getAll().subscribe((dat:Category[]) => {
        this.categories=dat;
      });
    }
    
    ngOnInit() {
      this.getCategories();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


