import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Testing';
  btnText="Subscribe";
  isSubscribe= false;

  subscribe(){
    this.isSubscribe = true;
    this.btnText= "Subscribed";
  }
}
