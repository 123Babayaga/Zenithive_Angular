import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-timer',
  imports: [CommonModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent
  implements AfterContentInit, OnChanges, OnInit, OnDestroy
{
  counter: number = 0;
  @Input() InitialTime: number = 0;
  @Input() triggerId: number = 0;
  timeInterval: any;
  isCounterComplete: Boolean = false;
  isStopped: Boolean = false;

  ngOnInit(): void {
    this.InitialTime = 0;
  }

  setTimer() {
    this.counter = this.InitialTime;
    // console.log(this.counter);
    this.isCounterComplete = false;
    this.timeInterval = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered:', changes);

    if (changes['InitialTime']) {
      console.log('Timer Updated Successfully..');
      if (this.InitialTime !== 0) {
        clearInterval(this.timeInterval);
        this.setTimer();
      }
    }

    if (changes['triggerId']) {
      console.log('Timer Updated Successfully..');
      if (this.InitialTime !== 0) {
        clearInterval(this.timeInterval);
        this.setTimer();
      }
    }
  }

  ngAfterContentInit(): void {
    if (this.counter !== 0) {
      this.setTimer();
      console.log('The timer has been started');
    }
  }

  stopTimer() {
    console.log('timer stop called');
    clearInterval(this.timeInterval);
    if (this.counter === 0) {
      this.isCounterComplete = true;
    } else {
      // alert('The Timer has been stopped');
      this.isStopped = true;
    }
  }

  startTimer() {
    this.isStopped = false;
    this.timeInterval = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }
}
