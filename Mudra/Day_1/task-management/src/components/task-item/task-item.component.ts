import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynamicDatePipePipe } from '../../dynamic-date-pipe.pipe';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task-item',
  imports: [CommonModule, DynamicDatePipePipe, TranslateModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent implements OnInit {
  @Input() task: any;

  @Output() taskUpdated = new EventEmitter<any>();
  @Output() taskDeleted = new EventEmitter<any>();
  ngOnInit(): void {
    // console.log(this.task);
  }

  updateTask(task: any) {
    this.taskUpdated.emit(task);
  }

  deleteTaskClicked(task: any) {
    this.taskDeleted.emit(task);
  }
}
