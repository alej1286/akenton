import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Produccion } from '../../Models/produccion';
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
import { Tipo } from 'src/app/Models/tipo';
import { Order } from 'src/app/Models/order';
import { TiposService } from 'src/app/Services/tipos.service';
import { OrdersService } from 'src/app/Services/orders.service';
import ResponsiveTable from '@uidax/responsive-table';
import { ProduccionsService } from 'src/app/Services/produccion.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.scss']
})
export class ProduccionComponent implements OnInit {
  dataSaved = false;
  produccionForm: any;
  allProduccions: Observable<Produccion[]>;
  dataSource: MatTableDataSource<Produccion>;
  selection = new SelectionModel<Produccion>(true, []);
  produccionIdUpdate = null;
  massage = null;

  allTipo: Observable<Tipo[]>;
  allOrder: Observable<Order[]>;
  tipos: Tipo[];

  SelectedDate = null;

  orders: Order[];

  TipoId = null;
  OrderId = null;
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  displayedColumns: string[] = [
    'select',
    'ordern','tipo','cantidad','inicio','fin','descr',
    'edit',
    'delete',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  

  constructor(
    private formbulider: FormBuilder,
    private ProduccionService: ProduccionsService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private TiposService: TiposService,
    private OrdersService: OrdersService
  ) {

    this.ProduccionService.getAllProduccions().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.TiposService.getAllTipos().subscribe((tipos) => {
      this.tipos = tipos as Tipo[];
    });

    this.OrdersService.getAllOrders().subscribe((orders) => {
      this.orders = orders as Order[];
    });


    let a = new ResponsiveTable({
      // string, the table selector.
      tableSelector: '.mat-elevation-z8',
      // string, the max width for media query.
      breakPoint: '480',
      // string, the label font weight for mobile.
      labelFontWeight: '900',
      // string, the suffix for label.
      labelSuffix: ':',
      // string, the margin-right of label.
      labelAfterSpace: '112',
      // array of number, hidden labels base on INDEX of column.
      hiddenLabels: []
    });
   }

  ngOnInit(): void {

    
    this.produccionForm = this.formbulider.group({
      ordern: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: ['', [Validators.required]],
      descr: ['', [Validators.required]],
    });
    this.FillTiposDDL();
    this.FillOrdersDDL();
    this.loadallProduccions();
   

    /* this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; */
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

  checkboxLabel(row: Produccion): string {
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
        numSelected.map((produccion) => {
          //debugger;

          this.ProduccionService.deleteProduccionById(produccion.id).subscribe((result) => {
            this.SavedSuccessful(2);
            this.loadallProduccions();
          });
        });
      }
    } else {
      alert('Select at least one row');
    }
  }

  /* applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */

  applyFilter(filterValue: Event) {
    this.dataSource.filter = (filterValue.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadallProduccions() {
    this.ProduccionService.getAllProduccions().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onFormSubmit() {
    this.dataSaved = false;
    let produccion = this.produccionForm.value;
    this.CreateProduccion(produccion);
    this.produccionForm.reset();
  }

  loadProduccionToEdit(produccionId: string) {
    this.ProduccionService.getProduccionById(produccionId).subscribe((produccion) => {
      
      this.massage = null;
      this.dataSaved = false;
      this.produccionIdUpdate = produccion[0].id;
      this.produccionForm.controls['ordern'].setValue(produccion[0].ordern);
      this.produccionForm.controls['tipo'].setValue(produccion[0].tipo);
      this.produccionForm.controls['cantidad'].setValue(produccion[0].cantidad);
      this.produccionForm.controls['inicio'].setValue(produccion[0].inicio);
      this.produccionForm.controls['fin'].setValue(produccion[0].fin);
      this.produccionForm.controls['descr'].setValue(produccion[0].descr);
      
      this.TipoId = produccion[0].tipo;
      this.OrderId = produccion[0].ordern;
      

      
      /* this.allState = this.ProduccionService.getState(employee.CountryId);
      this.CountryId = employee.CountryId;
      this.produccionForm.controls['State'].setValue(employee.StateId);
      this.allCity = this.ProduccionService.getCity(employee.StateId);
      this.StateId = employee.StateId;
      this.produccionForm.controls['City'].setValue(employee.Cityid);
      this.CityId = employee.Cityid;
      this.isMale = employee.Gender.trim() == "0" ? true : false;
      this.isFeMale = employee.Gender.trim() == "1" ? true : false; */
    });
  }
  CreateProduccion(produccion: Produccion) {
    //debugger;
  
    if (this.produccionIdUpdate == null) {
      /* employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId;
      */

      this.ProduccionService.CreateProduccion(produccion).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(1);
        this.loadallProduccions();
        this.produccionIdUpdate = null;
        this.produccionForm.reset();
      });
    } else {
      /* employee.EmpId = this.produccionIdUpdate;
      employee.CountryId = this.CountryId;
      employee.StateId = this.StateId;
      employee.Cityid = this.CityId; */
      
      //this.OrderId = SelOrderId.value;
    
      produccion.tipo = this.TipoId;
      produccion.ordern = this.OrderId;
      
          
      /* if (this.EstadoId === 3 ) {
        produccion.recogida = new Date();
      } */

      this.ProduccionService.updateProduccion(this.produccionIdUpdate, produccion).subscribe(
        () => {
          this.dataSaved = true;
          this.SavedSuccessful(0);
          this.loadallProduccions();
          this.produccionIdUpdate = null;
          this.produccionForm.reset();
        }
      );
    }
  }

  deleteProduccion(produccionId: string) {
    if (confirm('Are you sure you want to delete this ?')) {
      this.ProduccionService.deleteProduccionById(produccionId).subscribe(() => {
        this.dataSaved = true;
        this.SavedSuccessful(2);
        this.loadallProduccions();
        this.produccionIdUpdate = null;
        this.produccionForm.reset();
      });
    }
  }

  FillTiposDDL() {
    this.allTipo = this.TiposService.getAllTipos();
  }


  FillOrdersDDL(/* SelTipoID */) {
    this.allOrder = this.OrdersService.getAllOrders();
  }

  FillTipoDDL(SelTipoId) {
    this.TipoId = SelTipoId.value;
  }
  

  FillOrderDDL(SelOrderId) {
    //this.TipoId = this.ProduccionService.getState(SelCountryId.value);
    this.OrderId = SelOrderId.value;
    /*  this.CountryId = SelTipoId.value;
    this.allCity = this.CityId = null; */
  }

  resetForm() {
    this.produccionForm.reset();
    this.massage = null;
    this.dataSaved = false;
    this.loadallProduccions();
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
