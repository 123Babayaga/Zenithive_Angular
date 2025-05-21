import { Component, inject, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tasks, TaskServices } from '../../services/task.service';

@Component({
  selector: 'app-home',
  imports: [TaskItemComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  taskService: TaskServices = inject(TaskServices);

  isShowAll: Boolean = true;
  isShowCompleted: Boolean = false;
  isShowPending: Boolean = false;
  isShowInProgress: Boolean = false;
  isFilterClicked: Boolean = false;
  isAddtask: Boolean = false;

  title = '';
  desc = '';
  status = '';
  priority = '';
  assignTo = '';
  dueDate = '';
  currentTask!: Tasks;

  ngOnInit(): void {}

  showAll() {
    this.isShowAll = this.taskService.showAll();
    this.isShowCompleted = false;
    this.isShowPending = false;
    this.isShowInProgress = false;
  }

  showCompleted() {
    this.isShowAll = false;
    this.isShowCompleted = this.taskService.showCompleted();
    this.isShowPending = false;
    this.isShowInProgress = false;
  }

  showInProgress() {
    this.isShowAll = false;
    this.isShowCompleted = false;
    this.isShowPending = false;
    this.isShowInProgress = this.taskService.showInProgress();
  }

  showPending() {
    this.isShowAll = false;
    this.isShowCompleted = false;
    this.isShowPending = this.taskService.showPending();
    this.isShowInProgress = false;
  }

  filterClicked() {
    this.isFilterClicked = !this.isFilterClicked;
  }

  sortHighToLow() {
    const sorted = this.taskService.sortHighToLow();
    if (sorted) {
      this.isFilterClicked = false;
    }
  }

  sortLowToHigh() {
    const sorted = this.taskService.sortLowToHigh();
    if (sorted) {
      this.isFilterClicked = false;
    }
  }

  addTask() {
    this.isAddtask = true;
  }

  addSubmit() {
    this.currentTask = {
      _id: '12345678901232',
      title: this.title,
      description: this.desc,
      status: this.status,
      priority: this.priority,
      assignedTo: this.assignTo,
      dueDate: this.dueDate,
    };

    const added = this.taskService.addTask(this.currentTask);
    if (added) {
      alert('Task Added Successfully..');
      this.isAddtask = false;
    } else {
      alert('There is an error in adding Task.. Try later..');
    }
  }

  closeAdd() {
    this.isAddtask = false;
  }
}
