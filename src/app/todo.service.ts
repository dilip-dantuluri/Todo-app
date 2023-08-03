import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoData } from './todo-modal';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

   todoDetails = new BehaviorSubject<TodoData[]>([]);
   todoDetails$ = this.todoDetails.asObservable();

  getDetails(todoList:TodoData[]):void {
    // this.todoDetails.next([]);
   this.todoDetails.next(todoList);
  }

  constructor() { }
}
