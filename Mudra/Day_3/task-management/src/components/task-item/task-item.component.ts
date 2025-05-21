import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Tasks, TaskServices } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent implements OnInit, OnDestroy {
  taskService: TaskServices = inject(TaskServices);
  filteredTasks: any;

  title: any;
  desc: any;
  status: any;
  priority: any;
  assignTo: any;
  dueDate: any;
  currentTask: any;
  isUpdate: Boolean = false;
  taskSubscription!: Subscription;

  ngOnInit(): void {
    this.taskSubscription = this.taskService.getTasks().subscribe((tasks) => {
      this.filteredTasks = tasks;
    });
  }

  updateTask(task: any) {
    this.isUpdate = true;
    this.currentTask = task;
    this.title = this.currentTask?.title;
    this.desc = this.currentTask?.description;
    this.assignTo = this.currentTask?.assignedTo;
    this.dueDate = this.currentTask?.dueDate;
    this.status = this.currentTask?.status;
    this.priority = this.currentTask?.priority;
  }

  updateSubmit() {
    this.currentTask.title = this.title;
    this.currentTask.description = this.desc;
    this.currentTask.status = this.status;
    this.currentTask.priority = this.priority;
    this.currentTask.assignedTo = this.assignTo;
    this.currentTask.dueDate = this.dueDate;

    // console.log('update calledd...');

    const response = this.taskService.updateTask(this.currentTask);

    if (response) {
      alert('Task Updated Successfully..');
      this.isUpdate = false;
    } else {
      alert('Error in Update Task..');
      this.isUpdate = false;
    }
  }

  closeUpdate() {
    this.isUpdate = false;
  }

  deleteTask(task: any) {
    const deleted = this.taskService.deleteTask(task._id);

    if (deleted) {
      alert('Task Deleted Successfully..');
    }
  }

  handleCheckToggle(event: any, task: Tasks) {
    console.log('fn called');

    if (event.target.checked) {
      const marked = this.taskService.markTaskAsComplete(task);
      if (marked) {
        alert('Task marked as completed successfully..');
      }
    } else {
      const marked = this.taskService.unmarkTaskAsComplete(task);
      if (marked) {
        alert('Task is still pending..');
      }
    }
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) this.taskSubscription.unsubscribe();
  }
}
