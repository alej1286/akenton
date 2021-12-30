import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { EstadosService } from 'src/app/Services/estados.service';
import { Estado } from 'src/app/Models/estado';
@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {

  dataSaved = false;
  estadoForm: any;
  allEstados: Observable<Estado[]>;
  dataSource: MatTableDataSource<Estado>;
  selection = new SelectionModel<Estado>(true, []);
  estadoIdUpdate = null;
  massage = null;
  
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['select', 'descr', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(private formbulider: FormBuilder, private EstadosService: EstadosService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.EstadosService.getAllEstados().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    
  }

  ngOnInit() {
    this.estadoForm = this.formbulider.group({
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

  checkboxLabel(row: Estado): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  DeleteData() {
    let numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("Are you sure to delete items ")) {
        numSelected.map(estado =>{
          debugger;
    
          this.EstadosService.deleteEstadoById(estado.id).subscribe(result => {
            console.log(result);
            this.SavedSuccessful(2);
            this.loadallEstados();
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

  loadallEstados() {
    this.EstadosService.getAllEstados().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.estadoForm.value;
    this.CreateEstado(employee);
    this.estadoForm.reset();
  }
  loadEstadoToEdit(estadoId: string) {
    this.EstadosService.getEstadoById(estadoId).subscribe(estado => {
      //console.log(estado[0]);
    
      this.massage = null;
      this.dataSaved = false;
      this.estadoIdUpdate = estado[0].id;
      this.estadoForm.controls['descr'].setValue(estado[0].descr);
      /* this.allState = this.EstadosService.getState(employee.CountryId);
      this.CountryId = employee.CountryId;
      this.estadoForm.controls['State'].setValue(employee.StateId);
      this.allCity = this.EstadosService.getCity(employee.StateId);
      this.StateId = employee.StateId;
      this.estadoForm.controls['City'].setValue(employee.Cityid);
      this.CityId = employee.Cityid;
      this.isMale = employee.Gender.trim() == "0" ? true : false;
      this.isFeMale = employee.Gender.trim() == "1" ? true : false; */
    });

  }
  CreateEstado(estado: Estado) {
    if (this.estadoIdUpdate == null) {
      /* employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId;
 */
      this.EstadosService.CreateEstado(estado).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(1);
          this.loadallEstados();
          this.estadoIdUpdate = null;
          this.estadoForm.reset();
        }
      );
    } else {
      /* employee.EmpId = this.estadoIdUpdate;
      employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId; */
      //console.log(this.estadoIdUpdate,estado);
      this.EstadosService.updateEstado(this.estadoIdUpdate,estado).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(0);
        this.loadallEstados();
        this.estadoIdUpdate = null;
        this.estadoForm.reset();
      });
    }
  }
  
  deleteEstado(estadoId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.EstadosService.deleteEstadoById(estadoId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadallEstados();
        this.estadoIdUpdate = null;
        this.estadoForm.reset();

      });
    }

  }


  
  
  resetForm() {
    this.estadoForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadallEstados();
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
