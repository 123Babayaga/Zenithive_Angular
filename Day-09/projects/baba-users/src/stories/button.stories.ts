// button.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../lib/components/button/button.component';

// This meta configuration defines the component and its properties
const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  // Define the controls for your component's inputs
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['primary', 'secondary', 'danger', 'success', 'outline'] 
    },
    size: { 
      control: 'radio', 
      options: ['sm', 'md', 'lg'] 
    },
    disabled: { 
      control: 'boolean' 
    }
  },
  // Define default values for the component
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false
  }
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// Create different stories for each button variant
export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Primary Button</baba-button>`
  })
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Secondary Button</baba-button>`
  })
};

export const Danger: Story = {
  args: {
    variant: 'danger'
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Danger Button</baba-button>`
  })
};

export const Success: Story = {
  args: {
    variant: 'success'
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Success Button</baba-button>`
  })
};

export const Outline: Story = {
  args: {
    variant: 'outline'
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Outline Button</baba-button>`
  })
};


export const Small: Story = {
  args: {
    size: 'sm'
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Small Button</baba-button>`
  })
};

export const Large: Story = {
  args: {
    size: 'lg'
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Large Button</baba-button>`
  })
};


export const Disabled: Story = {
  args: {
    disabled: true
  },
  render: (args) => ({
    props: args,
    template: `<baba-button [variant]="variant" [size]="size" [disabled]="disabled">Disabled Button</baba-button>`
  })
};