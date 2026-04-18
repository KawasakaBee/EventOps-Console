import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SectionCard from './SectionCard';
import StatusChip from '../StatusChip/StatusChip';

const meta = {
  title: 'SharedUI/SectionCard',
  component: SectionCard,
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default card',
    title: 'Card title',
    actions: (
      <StatusChip
        status="submitted"
        shape="rounded"
        size="small"
        type="contained"
      />
    ),
  },
};
