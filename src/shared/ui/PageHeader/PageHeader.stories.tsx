import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PageHeader from './PageHeader';

const meta = {
  title: 'SharedUI/PageHeader',
  component: PageHeader,
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TitleOnly: Story = {
  args: {
    children: 'This is PageHeader title only',
    title: 'This is title',
  },
};

export const TitleWithSubtitle: Story = {
  args: {
    children: 'This is PageHeader title only',
    title: 'This is title',
    subtitle: 'This is subtitle',
  },
};

export const TitleWithActions: Story = {
  args: {
    children: 'This is PageHeader title only',
    title: 'This is title',
    actions: 'This is actions',
  },
};
