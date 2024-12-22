import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-task',
  imports: [CommonModule],
  templateUrl: './todo-task.component.html',
  styleUrl: './todo-task.component.css'
})
export class TodoTaskComponent {
   @Input() task!: Task;
}
export interface Task {
   id: number;
   taskName: string;
   priority: string;
   status: string;
}