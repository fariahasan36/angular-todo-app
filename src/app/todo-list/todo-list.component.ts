import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoTaskComponent } from '../todo-task/todo-task.component';
import { Task } from '../todo-task/todo-task.component';

@Component({
  selector: 'app-todo-list',
  imports: [TodoTaskComponent, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  tasks: Task[] = [
    { id: 1, taskName: 'Buy groceries', priority: 'High', status: 'Pending' },
    {
      id: 2,
      taskName: 'Clean the house',
      priority: 'Medium',
      status: 'In Progress',
    },
    { id: 3, taskName: 'Fix the sink', priority: 'Low', status: 'Completed' },
  ];
}
