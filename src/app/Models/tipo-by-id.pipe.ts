import { Pipe, PipeTransform } from '@angular/core';
import { Tipo } from './tipo';

@Pipe({
    name: 'tipoById'
  })
  export class tipoByIdPipe implements PipeTransform {
    transform(tipoId: number, tipos: Tipo[]): string {
      var tipo = tipos.find(tipoa => tipoa.id === tipoId);
      return tipo ? tipo.descr : "";
    };
  }