import { Injectable } from '@angular/core';
import { Produccion } from '../Models/produccion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProduccionsService {
  // Base url
  baseurl = 'https://akenton-server.herokuapp.com';

  private produccionUpdated = new Subject<Produccion[]>();

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // POST
  CreateProduccion(produccion: Produccion): Observable<Produccion> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Produccion>(this.baseurl + '/produccion/', produccion, httpOptions);
  }

  getUpdateListener() {
    return this.produccionUpdated.asObservable();
  }

  // GET

  getAllProduccions(): Observable<Produccion[]> {
    return this.http.get<Produccion[]>(this.baseurl + '/produccion');
  }

  updateProduccion(id, data): Observable<Produccion> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.put<Produccion>(
      this.baseurl + '/produccion/' + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  getProduccionById(produccionId: string): Observable<Produccion> {
    return this.http.get<Produccion>(this.baseurl + '/produccion/' + produccionId);
  }

  deleteProduccionById(produccion: any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<string>(
      this.baseurl + '/produccion/' + produccion,
      httpOptions
    );
  }

}
