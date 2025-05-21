import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../../reusable-ui-components/src/public-api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../reusable-ui-components/src/public-api';
import { CardsComponent } from '../../../reusable-ui-components/src/public-api';
import { CommonModule } from '@angular/common';
// import image from '';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    CardsComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-app';
  loginForm: FormGroup;
  numbers = Array.from({ length: 10 }, (_, i) => i);
  img = './assets/dice-1502706_640.jpg';

  constructor(private fb: FormBuilder) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3),
      ]),
    });
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  submitClicked() {
    alert('Submitted successfully..');
  }
}
