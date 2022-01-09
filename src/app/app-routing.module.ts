import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { UserProfileComponent } from './Components/auth/user-profile/user-profile.component';
import { ClientComponent } from './Components/client/client.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { EstadoComponent } from './Components/estado/estado.component';
import { InventoryComponent } from './Components/inventory/inventory.component';
import { OrderComponent } from './Components/order/order.component';
import { ProduccionComponent } from './Components/produccion/produccion.component';
import { PublicComponent } from './Components/public/public.component';
import { TipoComponent } from './Components/tipo/tipo.component';

const routes: Routes = [
  { path: '', component: PublicComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'orders', component: OrderComponent, canActivate:[AuthGuard]  },
  { path: 'tipos', component: TipoComponent, canActivate:[AuthGuard]  },
  { path: 'clients', component: ClientComponent, canActivate:[AuthGuard]  },
  { path: 'estados', component: EstadoComponent, canActivate:[AuthGuard]  },
  { path: 'inventories', component: InventoryComponent, canActivate:[AuthGuard]  },
  { path: 'produccion', component: ProduccionComponent, canActivate:[AuthGuard]  },
  { path: 'user-profile', component: UserProfileComponent, canActivate:[AuthGuard]  },
  
  
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
