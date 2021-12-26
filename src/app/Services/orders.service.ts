import { Injectable } from "@angular/core";
//import { Order } from "./orders.model";
import { Order } from "../Models/order";
import { Tipo } from "../Models/tipo";
import { HttpClient, HttpHeaders } from '@angular/common/http';


import {  Observable, throwError, Subject } from "rxjs";
import { retry, catchError } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class OrdersService {

    // Base url
  baseurl = 'https://akenton-server.herokuapp.com';

    private orderUpdated = new Subject<Order[]>();

    constructor(private http: HttpClient){}

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }

    // POST
    CreateOrder(order: Order): Observable<Order> {
        
        /* return this.http.post<Order>(this.baseurl + '/orders/', JSON.stringify(order), this.httpOptions)
        .pipe(
        retry(1),
        catchError(this.errorHandl)
        ) */
    
    
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        return this.http.post<Order>(this.baseurl + '/orders/',
          order, httpOptions);

    
      } 
    
    
    // GET
  /* GetOrder(id): Observable<Order> {
    return this.http.get<Order>(this.baseurl + '/orders/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  } */

    getUpdateListener(){
        return this.orderUpdated.asObservable();
    }

    // GET

    getAllOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(this.baseurl + '/orders');
    }  
  
   /*  GetOrders(): Observable<Order> {
    return this.http.get<Order>(this.baseurl + '/orders/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  } */

  // PUT
  /* UpdateOrder(id, data): Observable<Order> {
    return this.http.put<Order>(this.baseurl + '/orders/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  } */

  updateOrder(id, data): Observable<Order> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    console.log(id)
    console.log(data)
    return this.http.put<Order>(this.baseurl + '/orders/' + id,
    JSON.stringify(data), httpOptions);
  }


  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(this.baseurl + '/orders/' + orderId);
  }

/*   // DELETE
  DeleteOrder(id){
    return this.http.delete<Order>(this.baseurl + '/orders/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  } */

  deleteOrderById(order: any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<string>(this.baseurl + '/orders/' + order, httpOptions)
    //return this.http.post<string>(this.baseurl + '/orders/', order, httpOptions);
  }




    /* addOrder(descr: string, tipo: string, pallets: number){
        const order: Order = {_id : 0, descr,tipo,pallets};
        this.orders.push(order);    
        this.orderUpdated.next([...this.orders]);
    } */

    /* getOrder(){
        return this.orders; 
    } */

    getAllTipos(): Observable<Tipo[]> {
      return this.http.get<Tipo[]>(this.baseurl + '/tipos');
    }

// Error handling
errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}