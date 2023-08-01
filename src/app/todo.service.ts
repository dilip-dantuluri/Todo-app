import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoData } from './todo-modal';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoDetails = new BehaviorSubject<TodoData[]>([]);
  todoDetails$ = this.todoDetails.asObservable();

  getDetails(todoList:TodoData[]) {
    this.todoDetails.next([]);
   this.todoDetails.next(todoList);
  }

  constructor() { }
}
