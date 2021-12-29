import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { OrdersService } from '../../Services/orders.service';
import { Order } from '../../Models/order';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Tipo } from 'src/app/Models/tipo';
import { Client } from 'src/app/Models/client';
import { TiposService } from 'src/app/Services/tipos.service';
import { ClientsService } from 'src/app/Services/clients.service';




interface Country {
  CountryId: string;
  CountryName: string;
}
interface State {
  StateId: string;
  StateName: string;
  CountryId: string;
}
interface City {
  Cityid: string;
  CityName: string;
  StateId: string;
  CountryId: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  dataSaved = false;
  orderForm: any;
  allOrders: Observable<Order[]>;
  dataSource: MatTableDataSource<Order>;
  selection = new SelectionModel<Order>(true, []);
  orderIdUpdate = null;
  massage = null;
  
  allCountry: Observable<Country[]>;
  allTipo: Observable<Tipo[]>;
  allClient: Observable<Client[]>;
  tipos : Tipo[];

  clients : Client[];

  allState: Observable<State[]>;
  allCity: Observable<City[]>;
  
  CountryId = null;
  TipoId = null;
  ClientId = null;
  
  StateId = null;
  CityId = null;
  SelectedDate = null;
  isMale = true;
  isFeMale = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = ['select', 'client', 'tipo', 'pallets', 'descr', 'edit', 'delete'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formbulider: FormBuilder, private OrdersService: OrdersService, private _snackBar: MatSnackBar, public dialog: MatDialog, private TiposService: TiposService, private ClientsService: ClientsService) {
    this.OrdersService.getAllOrders().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      //console.log(this.dataSource); 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


    this.TiposService.getAllTipos()
    .subscribe(tipos => {
        this.tipos = tipos as Tipo[]
        //console.log(this.tipos);
    })
  
    
    this.ClientsService.getAllClients()
    .subscribe(clients => {
        this.clients = clients as Client[]
        //console.log(this.tipos);
    })
  
  }

  
  

  ngOnInit() {
    this.orderForm = this.formbulider.group({
      client: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      pallets: ['', [Validators.required]],
      descr: ['', [Validators.required]]
    });
    this.FillCountryDDL();
    this.FillTiposDDL();
    this.FillClientsDDL();
    this.loadallOrders();
    /* this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; */
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = !!this.dataSource && this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(r => this.selection.select(r));
  }

  checkboxLabel(row: Order): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  DeleteData() {
    let numSelected = this.selection.selected;
    if (numSelected.length > 0) {
      if (confirm("Are you sure to delete items ")) {
        numSelected.map(order =>{
          debugger;
    
          this.OrdersService.deleteOrderById(order.id).subscribe(result => {
            console.log(result);
            this.SavedSuccessful(2);
            this.loadallOrders();
          });
        });
      }
  } else {
    alert("Select at least one row");
  }
  }

  /* applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */

  applyFilter(filterValue: Event) {

    
    this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadallOrders() {
    this.OrdersService.getAllOrders().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.orderForm.value;
    this.CreateOrder(employee);
    this.orderForm.reset();
  }
  loadOrderToEdit(orderId: string) {
    this.OrdersService.getOrderById(orderId).subscribe(order => {
      //console.log(order[0]);
    
      this.massage = null;
      this.dataSaved = false;
      this.orderIdUpdate = order[0].id;
      this.orderForm.controls['client'].setValue(order[0].client);
      this.orderForm.controls['descr'].setValue(order[0].descr);
      this.orderForm.controls['pallets'].setValue(order[0].pallets);
      this.orderForm.controls['tipo'].setValue(order[0].tipo);
      /* this.allState = this.OrdersService.getState(employee.CountryId);
      this.CountryId = employee.CountryId;
      this.orderForm.controls['State'].setValue(employee.StateId);
      this.allCity = this.OrdersService.getCity(employee.StateId);
      this.StateId = employee.StateId;
      this.orderForm.controls['City'].setValue(employee.Cityid);
      this.CityId = employee.Cityid;
      this.isMale = employee.Gender.trim() == "0" ? true : false;
      this.isFeMale = employee.Gender.trim() == "1" ? true : false; */
    });

  }
  CreateOrder(order: Order) {
    if (this.orderIdUpdate == null) {
      /* employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId;
 */
      this.OrdersService.CreateOrder(order).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(1);
          this.loadallOrders();
          this.orderIdUpdate = null;
          this.orderForm.reset();
        }
      );
    } else {
      /* employee.EmpId = this.orderIdUpdate;
      employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId; */
      order.tipo = this.TipoId;
      order.client = this.ClientId;
      //console.log(this.orderIdUpdate,order);
      this.OrdersService.updateOrder(this.orderIdUpdate,order).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(0);
        this.loadallOrders();
        this.orderIdUpdate = null;
        this.orderForm.reset();
      });
    }
  }
  
  deleteOrder(orderId: string) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.OrdersService.deleteOrderById(orderId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadallOrders();
        this.orderIdUpdate = null;
        this.orderForm.reset();

      });
    }

  }

  FillCountryDDL() {
    //this.allCountry = this.OrdersService.getCountry();
    this.allState = this.StateId = this.allCity = this.CityId = null;
  }

  FillTiposDDL(/* SelTipoID */) {
    
    this.allTipo = this.TiposService.getAllTipos();
    
  } 
  
  FillClientsDDL(/* SelTipoID */) {

    this.allClient = this.ClientsService.getAllClients();
    
  }

  FillTipoDDL(SelTipoId) {
    //this.TipoId = this.OrdersService.getState(SelCountryId.value);
    this.TipoId = SelTipoId.value;
   /*  this.CountryId = SelTipoId.value;
    this.allCity = this.CityId = null; */
  }

  FillClientDDL(SelClientId) {
    //this.TipoId = this.OrdersService.getState(SelCountryId.value);
    this.ClientId = SelClientId.value;
   /*  this.CountryId = SelTipoId.value;
    this.allCity = this.CityId = null; */
  }
  

  FillCityDDL(SelStateId) {
    //this.allCity = this.OrdersService.getCity(SelStateId.value);
    this.StateId = SelStateId.value
  }

  GetSelectedCity(City) {
    this.CityId = City.value;
  }

  resetForm() {
    this.orderForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.isMale = true;
    this.isFeMale = false;
    this.loadallOrders();
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
