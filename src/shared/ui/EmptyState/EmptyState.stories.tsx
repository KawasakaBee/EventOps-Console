import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EmptyState from './EmptyState';

const meta = {
  title: 'SharedUI/EmptyState',
  component: EmptyState,
  argTypes: { children: { control: 'text' } },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
