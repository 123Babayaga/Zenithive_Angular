import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [TimerComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  initialTime: number = 0;
  inptCounter: number = 0;
  isSetTimerClicked: Boolean = false;
  triggerId: number = 0;
  isWelcome: Boolean = false;

  ngOnInit(): void {
    this.isWelcome = true;
  }

  setTimerClicked() {
    console.log('clicked');
    console.log(this.triggerId);

    if (this.inptCounter > 0) {
      this.isSetTimerClicked = true;
      this.initialTime = this.inptCounter;
      this.triggerId++;
      console.log(this.triggerId);
    }
  }

  closeWelcome() {
    this.isWelcome = false;
  }
}
