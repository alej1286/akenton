import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/Services/clients.service';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-td-client-translator',
  templateUrl: './td-client-translator.component.html',
  styleUrls: ['./td-client-translator.component.scss'],
})
export class TdClientTranslatorComponent implements OnInit {
  @Input() clientId: number;
  clientNombre: string = '';

  constructor(private ClientsService: ClientsService,private ref: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ClientsService.getAllClients().subscribe((clients) => {
      clients.map((client) => {
        if (this.clientId === client.id) {
          this.clientNombre = client.nombre;
          this.ref.detectChanges();
        }
      });
      //console.log(this.tipos);
    });
  }
}
