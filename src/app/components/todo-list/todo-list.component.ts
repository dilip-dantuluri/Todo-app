import { AfterViewInit, Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TodoData } from 'src/app/todo-modal';
import { TodoService } from 'src/app/todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  constructor(private todoService: TodoService) { }
  displayedColumns: string[] = ['title', 'description', 'status', 'createdDate', 'delete'];
  dataSource: MatTableDataSource<TodoData>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @Output() todoId = new EventEmitter<string>();
  @Output() todoEdit = new EventEmitter<{}>();
  selectedValue = 'all';
  allData: TodoData[] = [];
  dataOpions = [
    { value: 'all', viewValue: 'All' },
    { value: true, viewValue: 'Active' },
    { value: false, viewValue: 'Completed' },
  ];
  activeTask = 0;
  getTodoData() {
    this.todoService.todoDetails$.subscribe((resp: TodoData[]) => {
      this.allData = resp;
      this.setDataBound();
    })
  }

  setDataBound() {
    let data = [];
    if(this.selectedValue !== 'all') {
       this.allData.filter(val=> {
        if(val.status === this.selectedValue) {
          data.push(val);
        }
      })
    } else {
      data = this.allData;
    }
    this.dataSource = new MatTableDataSource(data);
    this.activeTask = data.filter(x => x.status).length;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteTodo(id: string) {
    this.todoId.emit(id);
  }

  editTodo(row) {
    this.todoEdit.emit(row);
  }

  ngOnInit(): void {
    this.getTodoData();
  }
}
