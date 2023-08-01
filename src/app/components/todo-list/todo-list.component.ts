import {AfterViewInit, Component, ViewChild, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { TodoData } from 'src/app/todo-modal';
import { TodoService } from 'src/app/todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  constructor(private todoService: TodoService){}
  displayedColumns: string[] = ['title', 'description', 'status', 'createdDate', 'delete'];
  dataSource: MatTableDataSource<TodoData>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  getTodoData() {
    this.todoService.todoDetails$.subscribe((resp:TodoData[])=> {
      this.dataSource = new MatTableDataSource(resp);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }
  ngOnInit(): void {
    this.getTodoData();
  }
}
