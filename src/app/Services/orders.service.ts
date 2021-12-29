import { Injectable } from '@angular/core';
import { Order } from '../Models/order';
import { Tipo } from '../Models/tipo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';
import { Client } from '../Models/client';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  // Base url
  baseurl = 'https://akenton-server.herokuapp.com';

  private orderUpdated = new Subject<Order[]>();

  constructor(private http: HttpClient) {}

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // POST
  CreateOrder(order: Order): Observable<Order> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<Order>(this.baseurl + '/orders/', order, httpOptions);
  }

  getUpdateListener() {
    return this.orderUpdated.asObservable();
  }

  // GET

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseurl + '/orders');
  }

  updateOrder(id, data): Observable<Order> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    console.log(id);
    console.log(data);
    return this.http.put<Order>(
      this.baseurl + '/orders/' + id,
      JSON.stringify(data),
      httpOptions
    );
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(this.baseurl + '/orders/' + orderId);
  }

  deleteOrderById(order: any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<string>(
      this.baseurl + '/orders/' + order,
      httpOptions
    );
  }

  /* getAllTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.baseurl + '/tipos');
  } */

  /* getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseurl + '/clients');
  } */

}
