import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from "./components/parent/parent.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ParentComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lifecycle-hooks-demo';
}
