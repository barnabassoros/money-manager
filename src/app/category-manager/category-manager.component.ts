import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from '../Category';

import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

  constructor(private categoryService: CategoryService, public dialog: MatDialog) { }

  addedCategory:Category = {
    id:0,
    name:""
  };

  updatedCategory:Category = {
    id:0,
    name:""
  };



  ngOnInit() {
    this.getCategories();
  
  }

  categories : Category[] =[];


  getCategories(): void {
    this.categoryService.getAll().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  deleteCategory(id:number) {
    this.categoryService.delete(id).subscribe(() => {
      this.categories = this.categories.filter(x => x.id !== id);
    });
  }

  addCategory() {
    this.openAddDialog();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CategoryManagerDialog, {
      width: '250px',
      data: { 
        id:this.addedCategory.id,
        name: this.addedCategory.name}
    });

    dialogRef.afterClosed().subscribe((result:Category) => {
      if(result!=null)
      {
      this.addedCategory=result;
      this.categoryService.create(this.addedCategory).subscribe(() => {
        this.categories.push(this.addedCategory);
      });
      }
    })
  }

  openEditDialog(category): void {
    const dialogRef = this.dialog.open(CategoryManagerEditDialog, {
      width: '250px',
      data: category
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!=null)
      {
        this.categoryService.update(result).subscribe();
      }
    })
  }



  
}

@Component({
  selector:'category-manager-dialog',
  templateUrl:'category-manager-dialog.html'
})
export class CategoryManagerDialog {
  constructor(
    public dialogRef: MatDialogRef<CategoryManagerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Category) {}

    
  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector:'category-manager-edit-dialog',
  templateUrl:'category-manager-edit-dialog.html'
})
export class CategoryManagerEditDialog {
  constructor(
    public dialogRef: MatDialogRef<CategoryManagerEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Category) {}

    
  onNoClick(): void {
    this.dialogRef.close();
  }
}