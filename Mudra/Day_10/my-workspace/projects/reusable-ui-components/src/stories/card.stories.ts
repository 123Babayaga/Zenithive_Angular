import { Meta, StoryObj } from '@storybook/angular';
import { CardsComponent } from '../public-api';

const meta: Meta<CardsComponent> = {
  component: CardsComponent,
  title: 'Component/card',
  tags: ['autodocs'],
  argTypes: {
    customStyle: {
      control: 'object',
      description: 'Inline custom styles applied via ngStyle',
    },
    isImage: {
      control: 'boolean',
      description: 'Do you want to add image iin card or not',
    },
    image: {
      control: 'text',
      description: 'URL or path of the image to be displayed in the card',
    },
  },
};

export default meta;

type Story = StoryObj<CardsComponent>;

export const WithImage: Story = {
  render: (args) => ({
    props: args,
    template: `<lib-cards [isImage]="isImage" [customStyle]='customStyle' [image]="image" >
      <div card-title>Card Title with Image</div>
      <div card-content>
        This card has an image and full content.
      </div>
      <div
        card-footer
        >Footer Text</div
      >
    </lib-cards>`,
  }),
  args: {
    image: 'assets/dice-1502706_640.jpg',
    customStyle: {
      border: '1px solid blue',
      'border-radius': '8px',
    },
    isImage: true,
  },
};

export const WithoutImage: Story = {
  render: (args) => ({
    props: args,
    template: `
        <lib-cards [customStyle]="customStyle" [isImage]="isImage">
          <div card-title>No Image Card</div>
          <div card-content>Image section is hidden in this card.</div>
          <div card-footer>Footer Area</div>
        </lib-cards>
      `,
  }),
  args: {
    isImage: false,
    customStyle: {
      'background-color': '#f8f9fa',
      padding: '10px',
      border: '1px solid black',
      'flex-direction': 'column',
      display: 'flex',
      gap: '20px',
    },
  },
};

export const TitleAndContentOnly: Story = {
  render: (args) => ({
    props: args,
    template: `
        <lib-cards [customStyle]="customStyle" [isImage]="false">
          <div card-title>Minimal Card</div>
          <div card-content>This card has no image or footer.</div>
        </lib-cards>
      `,
  }),
  args: {
    isImage: false,
    customStyle: {
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      padding: '10px',
    },
  },
};

export const FooterOnly: Story = {
  render: (args) => ({
    props: args,
    template: `
        <lib-cards [customStyle]="customStyle" [isImage]="false">
          <div card-footer>Only Footer Shown</div>
        </lib-cards>
      `,
  }),
  args: {
    isImage: false,
    image: '',
    customStyle: {
      backgroundColor: 'blue',
      padding: '10px',
      border: '1px solid blue',
    },
  },
};
