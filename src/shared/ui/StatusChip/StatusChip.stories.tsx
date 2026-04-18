import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StatusChip from './StatusChip';
import { expect, within } from 'storybook/test';
import { Stack } from '@mui/material';
import { statusChipConfig } from './StatusChip.types';
import getTypedKeys from '@/shared/utils/getTypedKeys';

const meta = {
  title: 'Shared UI/StatusChip',
  component: StatusChip,
  args: {
    status: 'accepted',
    shape: 'rounded',
    size: 'medium',
    type: 'contained',
  },
  argTypes: {
    status: {
      control: 'select',
    },
    shape: {
      control: 'radio',
    },
    size: {
      control: 'radio',
    },
    type: {
      control: 'radio',
    },
  },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId('status-chip');

    await expect(chip).toBeVisible();
    expect(chip.querySelector('svg')).not.toBeNull();
    await expect(getComputedStyle(chip).backgroundColor).not.toBe(
      'rgba(0, 0, 0, 0)',
    );
  },
};

export const Shape: Story = {
  args: {
    shape: 'square',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId('status-chip');

    await expect(getComputedStyle(chip).borderRadius).toBe('0px');
  },
};

export const Type: Story = {
  args: {
    type: 'outlined',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId('status-chip');

    await expect(getComputedStyle(chip).backgroundColor).toBe(
      'rgba(0, 0, 0, 0)',
    );
  },
};

export const GalleryContained: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      {getTypedKeys(statusChipConfig).map((status) => (
        <StatusChip
          key={status}
          status={status}
          shape="rounded"
          size="small"
          type="contained"
        />
      ))}
    </Stack>
  ),
};

export const GalleryOutlined: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      {getTypedKeys(statusChipConfig).map((status) => (
        <StatusChip
          key={status}
          status={status}
          shape="rounded"
          size="small"
          type="outlined"
        />
      ))}
    </Stack>
  ),
};
