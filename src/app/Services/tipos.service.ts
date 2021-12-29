import { Injectable } from '@angular/core';
import { Tipo } from '../Models/tipo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiposService {
  baseurl = 'https://akenton-server.herokuapp.com';

  constructor(private http: HttpClient) {}

  // POST
  CreateTipo(tipo: Tipo): Observable<Tipo> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Tipo>(this.baseurl + '/tipos/', tipo, httpOptions);
  }

  // GET
  getAllTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.baseurl + '/tipos');
  }

  updateTipo(id, data): Observable<Tipo> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<Tipo>(
      this.baseurl + '/tipos/' + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  getTipoById(tipoId: string): Observable<Tipo> {
    return this.http.get<Tipo>(this.baseurl + '/tipos/' + tipoId);
  }

  deleteTipoById(Tipo: any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.delete<string>(
      this.baseurl + '/tipos/' + Tipo,
      httpOptions
    );
  }
}
