import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../Models/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {

  baseurl = 'https://akenton-server.herokuapp.com';

  constructor(private http: HttpClient) {}

  // POST
  CreateEstado(estado: Estado): Observable<Estado> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Estado>(this.baseurl + '/estados/', estado, httpOptions);
  }

  // GET
  getAllEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.baseurl + '/estados');
  }

  updateEstado(id, data): Observable<Estado> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Estado>(
      this.baseurl + '/estados/' + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  getEstadoById(estadoId: string): Observable<Estado> {
    return this.http.get<Estado>(this.baseurl + '/estados/' + estadoId);
  }

  deleteEstadoById(Estado: any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete<string>(
      this.baseurl + '/estados/' + Estado,
      httpOptions
    );
  }
}
