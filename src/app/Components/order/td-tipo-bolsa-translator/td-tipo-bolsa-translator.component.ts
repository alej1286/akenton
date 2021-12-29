import { Component, Input, OnInit } from '@angular/core';
import { TiposService } from 'src/app/Services/tipos.service';

@Component({
  selector: 'app-td-tipo-bolsa-translator',
  templateUrl: './td-tipo-bolsa-translator.component.html',
  styleUrls: ['./td-tipo-bolsa-translator.component.scss'],
})
export class TDTipoBolsaTranslatorComponent implements OnInit {
  @Input() tipoId: number;
  tipoDescr: string = '';

  constructor(private TiposService: TiposService) {}

  ngOnInit(): void {
    
    this.TiposService.getAllTipos().subscribe((tipos) => {
      tipos.map((tipo) => {
        if (this.tipoId === tipo.id) {
          this.tipoDescr = tipo.descr;
        }
      });
      //console.log(this.tipos);
    });
  }
}
