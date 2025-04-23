import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnChanges {
  // Still need @Input to receive the individual task
  @Input() task!: Task;
  
  // Output to emit delete request
  @Output() deleteTask = new EventEmitter<number>();
  
  // Local state using signals
  editedTask = signal<Task | null>(null);
  isEditing = signal<boolean>(false);
  
  constructor(private taskService: TaskService) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    // Create a deep copy when receiving new input
    if (changes['task']) {
      this.resetEditedTask();
    }
  }
  
  resetEditedTask(): void {
    this.editedTask.set({ ...this.task });
  }
  
  startEditing(): void {
    this.isEditing.set(true);
    this.resetEditedTask();
  }
  
  cancelEditing(): void {
    this.isEditing.set(false);
  }
  
  saveTask(): void {
    // Now use the service to update the task
    if (this.editedTask()) {
      this.taskService.updateTask(this.editedTask()!);
      this.isEditing.set(false);
    }
  }
  
  updateStatus(status: 'pending' | 'in-progress' | 'completed'): void {
    const updatedTask = { ...this.task, status };
    this.taskService.updateTask(updatedTask);
  }
  
  updatePriority(priority: 'low' | 'medium' | 'high'): void {
    const updatedTask = { ...this.task, priority };
    this.taskService.updateTask(updatedTask);
  }
  
  onDeleteTask(): void {
    this.deleteTask.emit(this.task.id);
  }
  
  // Helper getters for displaying status and priority colors
  getStatusClass() {
    return {
      'status-pending': this.task.status === 'pending',
      'status-in-progress': this.task.status === 'in-progress',
      'status-completed': this.task.status === 'completed'
    };
  }
  
  getPriorityClass() {
    return {
      'priority-low': this.task.priority === 'low',
      'priority-medium': this.task.priority === 'medium',
      'priority-high': this.task.priority === 'high'
    };
  }
}