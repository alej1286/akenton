import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../Models/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  baseurl = 'https://akenton-server.herokuapp.com';

  constructor(private http: HttpClient) {}


  getAllInventorys(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.baseurl + '/inventories');
  }

// POST
CreateInventory(inventory: Inventory): Observable<Inventory> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  return this.http.post<Inventory>(this.baseurl + '/inventories/', inventory, httpOptions);
}


updateInventory(id, data): Observable<Inventory> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  return this.http.put<Inventory>(
    this.baseurl + '/inventories/' + id,
    JSON.stringify(data),
    httpOptions
  );
}

getInventoryById(inventoryId: string): Observable<Inventory> {
  return this.http.get<Inventory>(this.baseurl + '/inventories/' + inventoryId);
}

deleteInventoryById(Inventory: any): Observable<string> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  return this.http.delete<string>(
    this.baseurl + '/inventories/' + Inventory,
    httpOptions
  );
}

}
