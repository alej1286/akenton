import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DefaultComponent } from './Components/default/default.component';
import { OrderComponent } from './Components/order/order.component';

const routes: Routes = [
  {path:'', component: OrderComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path:'orders', component: OrderComponent}
  /* children : [
    {path: 'dashboard', component: DashboardComponent},
    {path:'orders', component: OrderComponent}]
  } */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
