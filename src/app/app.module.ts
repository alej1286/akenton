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
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

//import { MatDatepickerModule } from '@matheo/datepicker';
//import { MatNativeDateModule } from '@matheo/datepicker/core';

import { MatMenuModule } from '@angular/material/menu';

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
import {MatListModule} from '@angular/material/list';
import { TdEstadoTranslatorComponent } from './Components/order/td-estado-translator/td-estado-translator.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EstadoComponent } from './Components/estado/estado.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { InventoryService } from './Services/inventory.service';
import { ProduccionComponent } from './Components/produccion/produccion.component';
import { TdOrderTranslatorComponent } from './Components/produccion/td-order-translator/td-order-translator.component';
import { ProduccionsService } from './Services/produccion.service';
import { LoadingInterceptor } from './classes/loading-interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AuthModule } from "@auth0/auth0-angular";
import { environment as env } from "../environments/environment";
import { AuthButtonComponent } from './Components/auth/auth-button/auth-button.component';
import { UserProfileComponent } from './Components/auth/user-profile/user-profile.component';
import { PublicComponent } from './Components/public/public.component';
import {MatSortModule} from '@angular/material/sort';
import { ProductBarChartsComponent } from './Components/product-bar-charts/product-bar-charts.component';
import { NgChartsModule } from 'ng2-charts';

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
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSortModule

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
    TdEstadoTranslatorComponent,
    EstadoComponent,
    InventoryComponent,
    ProduccionComponent,
    TdOrderTranslatorComponent,
    AuthButtonComponent,
    UserProfileComponent,
    PublicComponent,
    ProductBarChartsComponent,



    


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
    OwlDateTimeModule, OwlNativeDateTimeModule,
    NgChartsModule,
    
    AuthModule.forRoot({
      domain: 'dev-8-afhfgl.us.auth0.com',
      clientId: 'tjZ8tpcvWvTOlzMLjs0paB4XaUxrPils',
      cacheLocation:'localstorage',
      useRefreshTokens: true
    }),
  ],
  
  providers: [OrdersService, TiposService, ClientsService,InventoryService,ProduccionsService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
