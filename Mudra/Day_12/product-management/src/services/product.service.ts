import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient: HttpClient = inject(HttpClient);
  baseUrl: string = 'https://fakestoreapi.com/';

  constructor() {}

  getProducts(): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl}products/`);
  }

  getProductDetails(id: any): Observable<Object> {
    return this.httpClient.get(`${this.baseUrl}products/${id}`);
  }
}
