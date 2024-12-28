import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../app.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  @Input() isEditing: boolean = false;
  @Input() taskId?: number;
  @Input() taskName!: string;
  @Input() priority!: string;
  @Output() taskAdded = new EventEmitter<Task>();

  onSubmit() {
    if (this.isEditing == false) {
      const newTask: Task = {
        //id: Date.now(), // Create a random id for the new task
        taskName: this.taskName,
        priority: this.priority,
        status: 'Pending' // Default status
      };
      this.taskAdded.emit(newTask);
    } else {
      const editTask: Task = {
        id: this.taskId, // Create a random id for the new task
        taskName: this.taskName,
        priority: this.priority,
        status: 'Pending'
      };
      this.taskAdded.emit(editTask);
    }
    
    this.taskName = '';
    this.priority = '1';
  }
}
