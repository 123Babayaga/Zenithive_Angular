import { Meta, StoryObj } from '@storybook/angular';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '../public-api';

const fb = new FormBuilder();

const meta: Meta<InputComponent> = {
  title: 'Component/Input',
  component: InputComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<InputComponent>;

export const TextInput: Story = {
  render: (args) => ({
    component: InputComponent,
    props: {
      ...args,
      formGroup: fb.group({ text: ['', [Validators.required]] }),
      controlName: 'text',
    },
  }),
  args: {
    label: 'Text Input',
    placeholder: 'Enter text',
    type: 'text',
    errorMessages: {
      required: 'Text is required',
    },
  },
};

export const EmailInput: Story = {
  render: (args) => ({
    component: InputComponent,
    props: {
      ...args,
      formGroup: fb.group({
        email: ['', [Validators.required, Validators.email]],
      }),
      controlName: 'email',
    },
  }),
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    errorMessages: {
      required: 'Email is required',
      email: 'Invalid email format',
    },
  },
};

export const PasswordInput: Story = {
  render: (args) => ({
    component: InputComponent,
    props: {
      ...args,
      formGroup: fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
      controlName: 'password',
    },
  }),
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    errorMessages: {
      required: 'Password is required',
      minlength: 'Minimum 6 characters required',
    },
  },
};

export const NumberInput: Story = {
  render: (args) => ({
    component: InputComponent,
    props: {
      ...args,
      formGroup: fb.group({
        number: [null, [Validators.required]],
      }),
      controlName: 'number',
    },
  }),
  args: {
    label: 'Number Input',
    placeholder: 'Enter a number',
    type: 'number',
    errorMessages: {
      required: 'Number is required',
    },
  },
};
