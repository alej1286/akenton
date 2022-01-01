import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Inventory } from 'src/app/Models/inventory';
import { InventoryService } from 'src/app/Services/inventory.service';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  dataSaved = false;
  inventoryForm: any;
  allInventorys: Observable<Inventory[]>;
  dataSource: MatTableDataSource<Inventory>;
  selection = new SelectionModel<Inventory>(true, []);
  inventoryIdUpdate = null;
  massage = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  displayedColumns: string[] = ['select', 'nombre','in_stock','notify', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbulider: FormBuilder, private InventoryService: InventoryService, private _snackBar: MatSnackBar, public dialog: MatDialog) { 

    this.InventoryService.getAllInventorys().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    this.inventoryForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
      in_stock: ['', [Validators.required]],
      notify: ['', [Validators.required]]
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
  }

  checkboxLabel(row: Inventory): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  DeleteData() {
    let numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("Are you sure to delete items ")) {
        numSelected.map(inventory =>{
          debugger;
    
          this.InventoryService.deleteInventoryById(inventory.id).subscribe(result => {
            this.SavedSuccessful(2);
            this.loadallInventories();
          });
        });
      }
  } else {
    alert("Select at least one row");
  }
  }


  loadallInventories() {
    this.InventoryService.getAllInventorys().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: Event) {

    
    this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFormSubmit() {
    this.dataSaved = false;
    const inventory = this.inventoryForm.value;
    this.CreateInventory(inventory);
    this.inventoryForm.reset();
  }
  loadInventoryToEdit(inventoryId: string) {
    this.InventoryService.getInventoryById(inventoryId).subscribe(inventory => {
      console.log(inventory[0]);
    
      this.massage = null;
      this.dataSaved = false;
      this.inventoryIdUpdate = inventory[0].id;
      this.inventoryForm.controls['nombre'].setValue(inventory[0].nombre);
      this.inventoryForm.controls['in_stock'].setValue(inventory[0].in_stock);
      this.inventoryForm.controls['notify'].setValue(inventory[0].notify);

    });

  }
  CreateInventory(inventory: Inventory) {
    //debugger;
    if (this.inventoryIdUpdate == null) {
      /* employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId;
 */
      this.InventoryService.CreateInventory(inventory).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(1);
          this.loadallInventories();
          this.inventoryIdUpdate = null;
          this.inventoryForm.reset();
        }
      );
    } else {
      console.log(this.inventoryIdUpdate,inventory);
      this.InventoryService.updateInventory(this.inventoryIdUpdate,inventory).subscribe(() => {
        console.log("updated")
        this.dataSaved = true;
        this.SavedSuccessful(0);
        this.loadallInventories();
        this.inventoryIdUpdate = null;
        this.inventoryForm.reset();
      });
    }
  }
  
  deleteInventory(inventoryId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.InventoryService.deleteInventoryById(inventoryId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadallInventories();
        this.inventoryIdUpdate = null;
        this.inventoryForm.reset();

      });
    }

  }


  
  
  resetForm() {
    this.inventoryForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadallInventories();
  }

  SavedSuccessful(isUpdate) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }



}
