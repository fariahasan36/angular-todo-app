import { Component, Output, EventEmitter, output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Task } from '../../app.component';


@Component({
  selector: 'app-todo-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  onSubmit(taskName: string, priority: string) {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000), // Create a random id for the new task
      taskName: taskName,
      priority: priority,
      status: "Pending" // Default status
    };
    this.taskAdded.emit(newTask);
    
  }
}
