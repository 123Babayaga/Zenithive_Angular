import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnChanges {
  title = 'timer-app';

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onchange inside app component');
  }
}
