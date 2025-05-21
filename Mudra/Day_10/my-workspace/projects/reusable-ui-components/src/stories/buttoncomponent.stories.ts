import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../public-api';
import { fn } from '@storybook/test';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Component/Button',
  tags: ['autodocs'],
  argTypes: {
    btnType: {
      control: {
        type: 'select',
      },
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ],
    },
  },
  args: {
    btnType: 'primary',
    type: 'submit',
    clicked: fn(),
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'primary',
    type: 'submit',
  },
};

export const Secondary: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'secondary',
    type: 'submit',
  },
};

export const Success: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'success',
    type: 'submit',
  },
};

export const Danger: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'danger',
    type: 'submit',
  },
};

export const Warning: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'warning',
    type: 'submit',
  },
};

export const Info: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'info',
    type: 'submit',
  },
};

export const Light: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'light',
    type: 'submit',
  },
};

export const Dark: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-button [btnType]="btnType" [type]="type" (clicked)="clicked()">Click Me</lib-button>`,
  }),
  args: {
    btnType: 'dark',
    type: 'submit',
  },
};
