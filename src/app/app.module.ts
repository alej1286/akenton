import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultComponent } from './Components/default/default.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';

import { OrdersService } from './Services/orders.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderComponent } from './Components/order/order.component';
import { tipoByIdPipe } from './Models/tipo-by-id.pipe';
import { TDTipoBolsaTranslatorComponent } from './Components/order/td-tipo-bolsa-translator/td-tipo-bolsa-translator.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TdClientTranslatorComponent } from './Components/order/td-client-translator/td-client-translator.component';
import { TiposService } from './Services/tipos.service';
import { ClientsService } from './Services/clients.service';
import { TipoComponent } from './Components/tipo/tipo.component';
import { ClientComponent } from './Components/client/client.component';

const Ux_Modules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatDatepickerModule,
  MatMenuModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
];
@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    SidebarComponent,
    DashboardComponent,
    OrderComponent,
    tipoByIdPipe,
    TDTipoBolsaTranslatorComponent,
    TdClientTranslatorComponent,
    TipoComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ux_Modules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CdkTableModule,
    FlexLayoutModule,
  ],
  providers: [OrdersService, TiposService, ClientsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
