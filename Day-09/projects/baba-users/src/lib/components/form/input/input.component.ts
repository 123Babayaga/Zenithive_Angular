import { Component, Input, Self, Optional, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AbstractControl, 
  ControlValueAccessor, 
  FormControl, 
  NgControl, 
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';


@Component({
    selector:'baba-input',
    standalone:true,
    imports:[CommonModule,ReactiveFormsModule],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})

export class InputComponent implements ControlValueAccessor, OnInit {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() type = 'text';
    @Input() id = '';
    @Input() helperText = '';
    @Input() required = false;
    @Input() email = false;
    @Input() minLength?: number;
    @Input() maxLength?: number;
    @Input() pattern?: string;
    
    control = new FormControl('');
  
    constructor(@Self() @Optional() private ngControl: NgControl) {
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
      }
    }
  
    ngOnInit(): void {
      if (this.ngControl && this.ngControl.control) {
        
        this.control = this.ngControl.control as FormControl;
      } else {
       
        const validators: ValidatorFn[] = [];
        
        if (this.required) validators.push(Validators.required);
        if (this.email) validators.push(Validators.email);
        if (this.minLength !== undefined) validators.push(Validators.minLength(this.minLength));
        if (this.maxLength !== undefined) validators.push(Validators.maxLength(this.maxLength));
        if (this.pattern) validators.push(Validators.pattern(this.pattern));
        
        this.control.setValidators(validators);
      }
      
      
      if (!this.id) {
        this.id = `input-${Math.random().toString(36).substring(2, 9)}`;
      }
    }
  
    get isInvalid(): boolean {
      return this.control.invalid && (this.control.dirty || this.control.touched);
    }
  
   
    writeValue(value: any): void {
      this.control.setValue(value, { emitEvent: false });
    }
  
    registerOnChange(fn: any): void {
      this.control.valueChanges.subscribe(fn);
    }
  
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    setDisabledState(isDisabled: boolean): void {
      isDisabled ? this.control.disable() : this.control.enable();
    }
  
    private onTouched = () => {};
  }
  