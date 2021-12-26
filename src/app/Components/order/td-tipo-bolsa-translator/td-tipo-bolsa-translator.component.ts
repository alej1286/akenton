import { Component, Input, OnInit } from '@angular/core';
import { Tipo } from 'src/app/Models/tipo';
import { OrdersService } from 'src/app/Services/orders.service';

@Component({
  selector: 'app-td-tipo-bolsa-translator',
  templateUrl: './td-tipo-bolsa-translator.component.html',
  styleUrls: ['./td-tipo-bolsa-translator.component.scss']
})
export class TDTipoBolsaTranslatorComponent implements OnInit {
  @Input() tipoId: number;
  tipoDescr:string = "";

  constructor(private OrdersService: OrdersService) { }

  ngOnInit(): void {
      
      this.OrdersService.getAllTipos()
      .subscribe(tipos => {
         tipos.map(tipo =>{
           if(this.tipoId === tipo.id){
              this.tipoDescr = tipo.descr;
            }
       });
        //console.log(this.tipos);
    });
  }

}
