import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../app.component';


@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() tasksProp!: Task[];
}
