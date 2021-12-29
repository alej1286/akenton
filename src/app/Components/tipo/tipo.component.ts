import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { TiposService } from 'src/app/Services/tipos.service';
import { Tipo } from 'src/app/Models/tipo';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.scss']
})
export class TipoComponent implements OnInit {

  dataSaved = false;
  tipoForm: any;
  allTipos: Observable<Tipo[]>;
  dataSource: MatTableDataSource<Tipo>;
  selection = new SelectionModel<Tipo>(true, []);
  tipoIdUpdate = null;
  massage = null;
  
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['select', 'descr', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private formbulider: FormBuilder, private TiposService: TiposService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.TiposService.getAllTipos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  ngOnInit() {
    this.tipoForm = this.formbulider.group({
      descr: ['', [Validators.required]]
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

  checkboxLabel(row: Tipo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  DeleteData() {
    let numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("Are you sure to delete items ")) {
        numSelected.map(tipo =>{
          debugger;
    
          this.TiposService.deleteTipoById(tipo.id).subscribe(result => {
            console.log(result);
            this.SavedSuccessful(2);
            this.loadallTipos();
          });
        });
      }
  } else {
    alert("Select at least one row");
  }
  }


  applyFilter(filterValue: Event) {

    
    this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadallTipos() {
    this.TiposService.getAllTipos().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.tipoForm.value;
    this.CreateTipo(employee);
    this.tipoForm.reset();
  }
  loadTipoToEdit(tipoId: string) {
    this.TiposService.getTipoById(tipoId).subscribe(tipo => {
      //console.log(tipo[0]);
    
      this.massage = null;
      this.dataSaved = false;
      this.tipoIdUpdate = tipo[0].id;
      this.tipoForm.controls['descr'].setValue(tipo[0].descr);
      /* this.allState = this.TiposService.getState(employee.CountryId);
      this.CountryId = employee.CountryId;
      this.tipoForm.controls['State'].setValue(employee.StateId);
      this.allCity = this.TiposService.getCity(employee.StateId);
      this.StateId = employee.StateId;
      this.tipoForm.controls['City'].setValue(employee.Cityid);
      this.CityId = employee.Cityid;
      this.isMale = employee.Gender.trim() == "0" ? true : false;
      this.isFeMale = employee.Gender.trim() == "1" ? true : false; */
    });

  }
  CreateTipo(tipo: Tipo) {
    if (this.tipoIdUpdate == null) {
      /* employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId;
 */
      this.TiposService.CreateTipo(tipo).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(1);
          this.loadallTipos();
          this.tipoIdUpdate = null;
          this.tipoForm.reset();
        }
      );
    } else {
      /* employee.EmpId = this.tipoIdUpdate;
      employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId; */
      //console.log(this.tipoIdUpdate,tipo);
      this.TiposService.updateTipo(this.tipoIdUpdate,tipo).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(0);
        this.loadallTipos();
        this.tipoIdUpdate = null;
        this.tipoForm.reset();
      });
    }
  }
  
  deleteTipo(tipoId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.TiposService.deleteTipoById(tipoId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadallTipos();
        this.tipoIdUpdate = null;
        this.tipoForm.reset();

      });
    }

  }


  
  
  resetForm() {
    this.tipoForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadallTipos();
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
