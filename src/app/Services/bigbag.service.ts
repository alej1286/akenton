import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BigbagService {
  baseurl = 'https://akenton-server.herokuapp.com';

  constructor(private http: HttpClient) { }

  decreaseBigbag(): Observable<void> {
    return this.http.get<void>(this.baseurl + '/decreasebigbag');
  }
}
