import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/Services/clients.service';
import { OrdersService } from 'src/app/Services/orders.service';
import { TiposService } from 'src/app/Services/tipos.service';

@Component({
  selector: 'app-td-order-translator',
  templateUrl: './td-order-translator.component.html',
  styleUrls: ['./td-order-translator.component.scss']
})
export class TdOrderTranslatorComponent implements OnInit {
  @Input() orderId: number;
  orderNombre: string = '';
  clientId: number;
  clientNombre: string = '';
  tipoId: number;
  tipoNombre: string = '';
  
  constructor(private OrderService: OrdersService, private ClientService: ClientsService, private TipoService: TiposService,private ref: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {

    /* let orderIDstr = "";
    orderIDstr = "" + this.orderId.toString();
    this.OrderService.getOrderById(orderIDstr).subscribe((order) => {
      this.clientId = order.client;
      this.tipoId = order.tipo;
      
      
      
    }); */

    /* this.ClientService.getClientById(this.clientId.toString()).subscribe((client) => {
        this.clientNombre = client.nombre;
      });

      this.TipoService.getTipoById(this.tipoId.toString()).subscribe((tipo) => {
        this.tipoNombre = tipo.descr;
      }); */

    this.OrderService.getAllOrders().subscribe((orders) => {
      orders.map((order) => {
        if (this.orderId === order.id) {
          this.orderNombre = order.descr /* + "|" + this.clientNombre+'|'+this.tipoNombre */;
          this.ref.detectChanges();
        }
      });
      //console.log(this.tipos);
    });
  }
}
