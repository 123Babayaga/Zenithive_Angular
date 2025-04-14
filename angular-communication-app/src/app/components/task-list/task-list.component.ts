import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  newTask: Omit<Task, 'id'> = {
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  };

  constructor(public taskService: TaskService) {}

  filterTasks(filter: string): void {
    this.taskService.setFilter(filter);
  }

  sortTasks(criteria: string): void {
    this.taskService.setSorting(criteria);
  }


  addTask(): void {
    if (this.newTask.title.trim()) {
      this.taskService.addTask({...this.newTask});
      
    
      this.newTask = {
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium'
      };
    }
  }


  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}