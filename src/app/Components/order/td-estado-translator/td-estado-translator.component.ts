import { Component, Input, OnInit } from '@angular/core';
import { EstadosService } from 'src/app/Services/estados.service';

@Component({
  selector: 'app-td-estado-translator',
  templateUrl: './td-estado-translator.component.html',
  styleUrls: ['./td-estado-translator.component.scss']
})
export class TdEstadoTranslatorComponent implements OnInit {
  @Input() estadoId: number;
  estadoDescr: string = '';

  constructor(private EstadosService: EstadosService) {}

  ngOnInit(): void {
    
    this.EstadosService.getAllEstados().subscribe((estados) => {
      estados.map((estado) => {
        if (this.estadoId === estado.id) {
          //console.log(estado)
          this.estadoDescr = estado.descr;
        }
      });
      //console.log(this.estados);
    });
  }

}
