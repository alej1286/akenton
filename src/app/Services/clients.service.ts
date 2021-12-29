import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../Models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseurl = 'https://akenton-server.herokuapp.com';

  constructor(private http: HttpClient) {}


  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseurl + '/clients');
  }

// POST
CreateClient(client: Client): Observable<Client> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  return this.http.post<Client>(this.baseurl + '/clients/', client, httpOptions);
}


updateClient(id, data): Observable<Client> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  return this.http.put<Client>(
    this.baseurl + '/clients/' + id,
    JSON.stringify(data),
    httpOptions
  );
}

getClientById(clientId: string): Observable<Client> {
  return this.http.get<Client>(this.baseurl + '/clients/' + clientId);
}

deleteClientById(Client: any): Observable<string> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  return this.http.delete<string>(
    this.baseurl + '/clients/' + Client,
    httpOptions
  );
}

}
