import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from '../components/todo-dialog/todo-dialog.component';
import { TodoData } from '../todo-modal';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  constructor(public dialog: MatDialog, private todoService: TodoService) { }
  todoList: TodoData[] = [];
  openDialog() {
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      data: {
        title: '',
        description: '',
        status: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.create(result);
      }
    });
  }

  create(result: TodoData) {
    result.id = result.id ? result.id : "id" + Math.random().toString(16).slice(2);
    result.createdDate = new Date();
    this.todoList.push(result);
    this.todoService.todoDetails.next(Object.assign([], this.todoList));
  }
}