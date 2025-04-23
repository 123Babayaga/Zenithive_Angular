import { Component } from '@angular/core';
import { ButtonComponent, CardComponent, InputComponent } from '../../projects/baba-users/src/public-api';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule, CardComponent, InputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form:FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  

  onSubmit(){
    if(this.form.valid){
      console.log('Form submitted:', this.form.value);
      alert('Form submitted successfully!');
      this.form.reset();
    }else {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
  }
}
}
