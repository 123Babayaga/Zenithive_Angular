// card.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '../lib/components/button/button.component';
import { CardComponent } from '../lib/components/card/card.component';

// This meta configuration defines the component and its properties
const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<CardComponent>;


export const Basic: Story = {
  render: () => ({
    template: `
      <baba-card>
        <div card-body>
          <h3>Basic Card</h3>
          <p>This is a simple card with only body content.</p>
        </div>
      </baba-card>
    `
  })
};


export const CompleteCard: Story = {
  render: () => ({
    template: `
      <baba-card>
        <div card-header>
          <h3>Card Title</h3>
        </div>
        <div card-body>
          <p>This card has a header, body, and footer.</p>
          <p>You can put any content inside each section.</p>
        </div>
        <div card-footer>
          <small>Footer information</small>
        </div>
      </baba-card>
    `
  })
};

export const WithHeader: Story = {
  render: () => ({
    template: `
      <baba-card>
        <div card-header>
          <h3>Card With Header</h3>
        </div>
        <div card-body>
          <p>This card has a header and body, but no footer.</p>
        </div>
      </baba-card>
    `
  })
};


export const WithFooter: Story = {
  render: () => ({
    template: `
      <baba-card>
        <div card-body>
          <h3>Card With Footer Only</h3>
          <p>This card has a body and footer, but no header.</p>
        </div>
        <div card-footer>
          <small>Footer content here</small>
        </div>
      </baba-card>
    `
  })
};


export const InteractiveCard: Story = {
  render: () => ({
    template: `
      <baba-card>
        <div card-header>
          <h3>Interactive Card</h3>
        </div>
        <div card-body>
          <p>This card includes interactive elements like buttons.</p>
          <p>Cards are versatile components that can contain various content.</p>
        </div>
        <div card-footer>
          <baba-button variant="primary" size="sm">Save</baba-button>
          <baba-button variant="outline" size="sm" style="margin-left: 8px">Cancel</baba-button>
        </div>
      </baba-card>
    `
  })
};


export const RichContent: Story = {
  render: () => ({
    template: `
      <baba-card>
        <div card-header>
          <h3>Product Information</h3>
        </div>
        <div card-body>
          <img src="https://via.placeholder.com/300x200" alt="Product image" style="width: 100%; height: auto">
          <h4 style="margin-top: 16px">Product Name</h4>
          <p>Detailed product description goes here. This showcases how cards can display rich content.</p>
          <ul>
            <li>Feature one</li>
            <li>Feature two</li>
            <li>Feature three</li>
          </ul>
          <p><strong>Price:</strong> $99.99</p>
        </div>
        <div card-footer>
          <baba-button variant="success">Add to Cart</baba-button>
          <baba-button variant="outline" style="margin-left: 8px">More Info</baba-button>
        </div>
      </baba-card>
    `
  })
};


export const CustomStyled: Story = {
  render: () => ({
    template: `
      <baba-card style="max-width: 300px; box-shadow: 0 8px 16px rgba(0,0,0,0.1);">
        <div card-header style="background-color: #f0f9ff; border-bottom: 2px solid #bae6fd;">
          <h3 style="color: #0369a1">Custom Styled Card</h3>
        </div>
        <div card-body>
          <p>This card uses inline styles to customize its appearance.</p>
          <p>In a real application, you might use CSS classes instead.</p>
        </div>
        <div card-footer style="background-color: #f8fafc;">
          <baba-button variant="primary">Action</baba-button>
        </div>
      </baba-card>
    `
  })
};