import { Component, Output, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './ui/todo-form/todo-form.component';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, tap, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    TodoListComponent,
    TodoFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-todo-app';
  taskId?: number;
  taskName!: string;
  priority: string = '1';
  status!: string;
  isEditing: boolean = false;

  tasks: Task[] = [];

  baseURL: string = 'http://localhost:3000/';
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<Task[]>(this.baseURL)
      .subscribe((tasks) => (this.tasks = tasks));
    console.log('Call ngOnInit');
  }

  addTask(newTask: Task) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(newTask);
    console.log(body);
    if (this.isEditing == false) {
      //  this.tasks.push(newTask);
      this.httpClient
        .post(this.baseURL + 'addTask', body, {
          headers: headers,
        })
        .pipe(
          tap((response: any) => {
            console.log('Task added successfully:', response.tid);
            if (response.status == 200) {
              newTask.id = response.tid;
              this.tasks.push(newTask);
              this.resetField();
            }
          }),
          catchError((error) => {
            console.error('Error adding task:', error);
            return of(error); // Return an observable to handle errors gracefully
          })
        )
        .subscribe();
    } else {
      let params = new HttpParams();
      params = params.append('id', newTask.id ? newTask.id : 'null');

      let httpOptions = {
        headers: headers,
        params: params,
      };

      this.httpClient
        .post(this.baseURL + 'editTask', body, httpOptions)
        .pipe(
          tap((response: any) => {
            console.log('Task edited successfully:', response.status);
            if (response.status == 200) {
              let indexToUpdate = this.tasks.findIndex(
                (item: Task) => item.id === newTask.id
              );
              this.tasks[indexToUpdate].taskName = newTask.taskName;
              this.tasks[indexToUpdate].priority = newTask.priority;
              this.tasks[indexToUpdate].status = newTask.status;

              this.tasks = Object.assign([], this.tasks);

              this.resetField();
            }
          }),
          catchError((error) => {
            console.error('Error editing task:', error);
            return of(error); // Return an observable to handle errors gracefully
          })
        )
        .subscribe();
    }
  }

  editTask(editTask: Task) {
    this.taskId = editTask.id;
    this.taskName = editTask.taskName;
    this.priority = editTask.priority;
    this.isEditing = true;
  }

  deleteTask(id: number) {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams();
    params = params.append('id', id ? id : 'null');

    let httpOptions = {
      headers: headers,
      params: params,
    };
    this.httpClient
      .post(this.baseURL + 'deleteTask', null, httpOptions)
      .pipe(
        tap((response: any) => {
          console.log('Task deleted successfully:', response.status);
          if (response.status == 200) {
            this.tasks = this.tasks.filter((item: Task) => item.id !== id);
          }
        }),
        catchError((error) => {
          console.error('Error editing task:', error);
          return of(error); // Return an observable to handle errors gracefully
        })
      )
      .subscribe();
  }
  editTaskStatus(editTaskStatus: Task) {
    const headers = { 'content-type': 'application/json' };
    let params = new HttpParams();
    params = params.append(
      'id',
      editTaskStatus.id ? editTaskStatus.id : 'null'
    );

    let httpOptions = {
      headers: headers,
      params: params,
    };
    this.httpClient
      .post(this.baseURL + 'editTaskStatus', null, httpOptions)
      .pipe(
        tap((response: any) => {
          console.log('Task status edited successfully:', response.status);
          if (response.status == 200) {
            let indexToUpdate = this.tasks.findIndex(
              (item: Task) => item.id === editTaskStatus.id
            );
            if (editTaskStatus.status == 'Pending') {
              this.tasks[indexToUpdate].status = 'Done';
            } else {
              this.tasks[indexToUpdate].status = 'Pending';
            }
            this.tasks = Object.assign([], this.tasks);

            this.resetField();
          }
        }),
        catchError((error) => {
          console.error('Error editing task:', error);
          return of(error); // Return an observable to handle errors gracefully
        })
      )
      .subscribe();
  }
  resetField() {
    this.isEditing = false;
    console.log('I am called!');
  }
}
export interface Task {
  id?: number;
  taskName: string;
  priority: string;
  status: string;
}
