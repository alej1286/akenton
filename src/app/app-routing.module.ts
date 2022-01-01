import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './Components/client/client.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EstadoComponent } from './Components/estado/estado.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { OrderComponent } from './Components/order/order.component';
import { ProduccionComponent } from './Components/produccion/produccion.component';
import { TipoComponent } from './Components/tipo/tipo.component';

const routes: Routes = [
  { path: '', component: OrderComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'tipos', component: TipoComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'estados', component: EstadoComponent },
  { path: 'inventories', component: InventoryComponent },
  { path: 'produccion', component: ProduccionComponent },
  /* children : [
    {path: 'dashboard', component: DashboardComponent},
    {path:'orders', component: OrderComponent}]
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
