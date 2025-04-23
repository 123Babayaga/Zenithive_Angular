// input.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../lib/components/form/input/input.component';

// Create a wrapper component for form control integration
@Component({
  selector: 'form-wrapper',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputComponent],
  template: `
    <form [formGroup]="form">
      <baba-input
        [label]="label"
        [placeholder]="placeholder"
        [type]="type"
        [id]="id"
        [helperText]="helperText"
        [required]="required"
        [email]="email"
        [minLength]="minLength"
        [maxLength]="maxLength"
        [pattern]="pattern"
        formControlName="inputField"
      ></baba-input>
    </form>
  `
})
class FormWrapperComponent {
  form = new FormGroup({
    inputField: new FormControl('')
  });
  
  // Props that match InputComponent's inputs
  label = '';
  placeholder = '';
  type = 'text';
  id = '';
  helperText = '';
  required = false;
  email = false;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}


const meta: Meta<FormWrapperComponent> = {
  title: 'Components/Input',
  component: FormWrapperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, CommonModule, InputComponent]
    })
  ],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { 
      control: 'select', 
      options: ['text', 'email', 'password', 'number', 'tel', 'url']
    },
    id: { control: 'text' },
    helperText: { control: 'text' },
    required: { control: 'boolean' },
    email: { control: 'boolean' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    pattern: { control: 'text' }
  },
  args: {
    label: 'Input Label',
    placeholder: 'Enter value',
    type: 'text',
    id: 'demo-input',
    helperText: 'Helper text provides additional guidance',
    required: false,
    email: false,
  }
};

export default meta;
type Story = StoryObj<FormWrapperComponent>;


export const Text: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'Choose a unique username',
  }
};


export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field cannot be empty',
    required: true,
    helperText: 'This field is mandatory'
  }
};


export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'example@domain.com',
    email: true,
    required: true,
    helperText: 'We\'ll never share your email'
  }
};


export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    minLength: 8,
    helperText: 'Password must be at least 8 characters'
  }
};


export const WithLengthConstraints: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    minLength: 10,
    maxLength: 100,
    helperText: 'Between 10 and 100 characters'
  }
};


export const WithPattern: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '123-456-7890',
    pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}$',
    helperText: 'Format: 123-456-7890'
  }
};


export const FormExample: Story = {
  render: () => ({
    template: `
      <div style="max-width: 400px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
        <h3 style="margin-top: 0; margin-bottom: 20px;">Registration Form</h3>
        <form [formGroup]="registerForm">
          <div style="margin-bottom: 16px;">
            <baba-input
              label="Full Name"
              placeholder="Enter your full name"
              required="true"
              formControlName="name"
            ></baba-input>
          </div>
          
          <div style="margin-bottom: 16px;">
            <baba-input
              label="Email Address"
              placeholder="your.email@example.com"
              type="email"
              required="true"
              email="true"
              formControlName="email"
            ></baba-input>
          </div>
          
          <div style="margin-bottom: 16px;">
            <baba-input
              label="Password"
              type="password"
              placeholder="Choose a secure password"
              required="true"
              minLength="8"
              formControlName="password"
              helperText="At least 8 characters"
            ></baba-input>
          </div>
          
          <button 
            style="background-color: #3b82f6; color: white; border: none; padding: 8px 16px; 
                  border-radius: 4px; cursor: pointer; font-weight: 500;"
            [disabled]="registerForm.invalid"
          >
            Register
          </button>
        </form>
      </div>
    `,
    props: {
      registerForm: new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl('')
      })
    }
  })
};