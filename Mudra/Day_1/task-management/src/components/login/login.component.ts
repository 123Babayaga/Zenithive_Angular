import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Username:', form.value.username);
      console.log('Password:', form.value.password);
      form.reset()
      // Add your login logic here
    } else {
      console.log('Form is invalid');
      // Optionally, mark all fields as touched to display errors
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
