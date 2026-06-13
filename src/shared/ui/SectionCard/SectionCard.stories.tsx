import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SectionCard from './SectionCard';
import StatusChip from '../StatusChip/StatusChip';
import { Typography } from '@mui/material';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Shared UI/SectionCard',
  component: SectionCard,
  args: {
    title: 'Тестовое название',

    children: <Typography variant="body2">Карточка расписания</Typography>,
  },
  argTypes: {
    children: { control: false },
    actions: { control: false },
    title: { control: 'text' },
    restSx: { control: false },
  },
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const title = args.title ? canvas.getByText(args.title) : null;
    const children = canvas.getByText('Карточка расписания');

    await expect(children).toBeVisible();
    if (title !== null) await expect(title).toBeVisible();
  },
};

export const WithActions: Story = {
  args: {
    actions: (
      <StatusChip
        status="submitted"
        shape="rounded"
        size="small"
        type="contained"
      />
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const actions = canvas.getByTestId('actions');

    await expect(actions).toBeVisible();
  },
};
