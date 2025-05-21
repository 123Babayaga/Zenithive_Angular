import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'lib-input',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';

  @Input() controlName = '';
  @Input() formGroup?: FormGroup;
  @Input() validators: ValidatorFn[] = [];

  @Input() formControl?: FormControl;

  @Input() errorMessages: { [key: string]: string } = {};

  ngOnInit(): void {
    if (!this.formControl && this.formGroup && this.controlName) {
      const controlExists = this.formGroup.get(this.controlName);
      if (!controlExists) {
        this.formGroup.addControl(
          this.controlName,
          new FormControl('', this.validators)
        );
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['validators'] && this.control && !this.formControl) {
      this.control.setValidators(this.validators);
      this.control.updateValueAndValidity();
    }
  }

  get control(): FormControl {
    return (
      this.formControl ?? (this.formGroup?.get(this.controlName) as FormControl)
    );
  }

  get showError(): boolean {
    return (
      this.control?.invalid && (this.control.dirty || this.control.touched)
    );
  }

  get firstErrorKey(): string | null {
    return this.control?.errors ? Object.keys(this.control.errors)[0] : null;
  }

  get errorMessage(): string | null {
    if (!this.firstErrorKey) return null;
    return this.errorMessages[this.firstErrorKey] || 'Invalid input';
  }
}
