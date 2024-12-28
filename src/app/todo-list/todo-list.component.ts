import { Component, input, Input, Output, EventEmitter, output } from '@angular/core';
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
  @Output() taskEdit = new EventEmitter<Task>();
  @Output() taskDelete = new EventEmitter<number>();

  editTask(task: Task) {
    this.taskEdit.emit(task);
  }

  deleteTask(id?: number) {    
    this.taskDelete.emit(id);   
  }
}
