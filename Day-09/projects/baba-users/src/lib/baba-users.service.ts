import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInterface } from './types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class BabaUsersService {

  constructor() { }

  getUsers(): Observable<UserInterface[]>{
      return of([
        {id:'1',name:'Aayush'},
        {id:'2',name:'Parekh'},
      ])
  }
}
