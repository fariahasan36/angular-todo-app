import { Component, Output, EventEmitter,} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';  
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './ui/todo-form/todo-form.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TodoListComponent, TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-todo-app';

  tasks: Task[] = [
      { id: 1, taskName: 'Buy groceries', priority: 'High', status: 'Pending' },
      {
        id: 2,
        taskName: 'Clean the house',
        priority: 'Medium',
        status: 'In Progress',
      }
      ,{ id: 3, taskName: 'Fix the sink', priority: 'Low', status: 'Completed' }
    ];

    addTask(newTask: Task) {
      console.log('addTask called2');
      this.tasks.push(newTask);
      console.log(this.tasks);
    }
}
export interface Task {
  id: number;
  taskName: string;
  priority: string;
  status: string;
}
