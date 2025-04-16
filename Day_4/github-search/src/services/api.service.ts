import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient: HttpClient = inject(HttpClient);
  baseUrl: String = 'https://api.github.com/users';

  constructor() {}

  get(user: any): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${user}`);
  }
}
