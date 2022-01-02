import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Client } from 'src/app/Models/client';
import { ClientsService } from 'src/app/Services/clients.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  dataSaved = false;
  clientForm: any;
  allClients: Observable<Client[]>;
  dataSource: MatTableDataSource<Client>;
  selection = new SelectionModel<Client>(true, []);
  clientIdUpdate = null;
  massage = null;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['select', 'nombre', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formbulider: FormBuilder,
    private ClientsService: ClientsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.ClientsService.getAllClients().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.clientForm = this.formbulider.group({
      nombre: ['', [Validators.required]],
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((r) => this.selection.select(r));
  }

  checkboxLabel(row: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
  DeleteData() {
    let numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm('Are you sure to delete items ')) {
        numSelected.map((client) => {
          debugger;

          this.ClientsService.deleteClientById(client.id).subscribe(
            (result) => {
              console.log(result);
              this.SavedSuccessful(2);
              this.loadallClients();
            }
          );
        });
      }
    } else {
      alert('Select at least one row');
    }
  }

  applyFilter(filterValue: Event) {
    this.dataSource.filter = (filterValue.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadallClients() {
    this.ClientsService.getAllClients().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.clientForm.value;
    this.CreateClient(employee);
    this.clientForm.reset();
  }
  loadClientToEdit(clientId: string) {
    this.ClientsService.getClientById(clientId).subscribe((client) => {
      //console.log(client[0]);

      this.massage = null;
      this.dataSaved = false;
      this.clientIdUpdate = client[0].id;
      this.clientForm.controls['nombre'].setValue(client[0].nombre);
      /* this.allState = this.ClientsService.getState(employee.CountryId);
      this.CountryId = employee.CountryId;
      this.clientForm.controls['State'].setValue(employee.StateId);
      this.allCity = this.ClientsService.getCity(employee.StateId);
      this.StateId = employee.StateId;
      this.clientForm.controls['City'].setValue(employee.Cityid);
      this.CityId = employee.Cityid;
      this.isMale = employee.Gender.trim() == "0" ? true : false;
      this.isFeMale = employee.Gender.trim() == "1" ? true : false; */
    });
  }
  CreateClient(client: Client) {
    if (this.clientIdUpdate == null) {
      /* employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId;
 */
      this.ClientsService.CreateClient(client).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(1);
        this.loadallClients();
        this.clientIdUpdate = null;
        this.clientForm.reset();
      });
    } else {
      /* employee.EmpId = this.clientIdUpdate;
      employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId; */
      //console.log(this.clientIdUpdate,client);
      this.ClientsService.updateClient(this.clientIdUpdate, client).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(0);
          this.loadallClients();
          this.clientIdUpdate = null;
          this.clientForm.reset();
        }
      );
    }
  }

  deleteClient(clientId: string) {
    if (confirm('Are you sure you want to delete this ?')) {
      this.ClientsService.deleteClientById(clientId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadallClients();
        this.clientIdUpdate = null;
        this.clientForm.reset();
      });
    }
  }

  resetForm() {
    this.clientForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadallClients();
  }

  SavedSuccessful(isUpdate) {
    if (isUpdate == 0) {
      this._snackBar.open('Record Updated Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else if (isUpdate == 1) {
      this._snackBar.open('Record Saved Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    } else if (isUpdate == 2) {
      this._snackBar.open('Record Deleted Successfully!', 'Close', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
