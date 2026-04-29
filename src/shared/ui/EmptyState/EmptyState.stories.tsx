import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import EmptyState from './EmptyState';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Shared UI/EmptyState',
  component: EmptyState,
  args: {
    title: 'Тестовый Empty State',
    subtitle: 'Текст, помогающий понять, что нужно делать',
  },
  argTypes: {
    action: { control: false },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default Empty State',
    subtitle: 'Текст, помогающий понять, что нужно делать',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByTestId('empty-state-title');
    const subtitle = canvas.getByTestId('empty-state-subtitle');

    await expect(title).toBeVisible();
    await expect(canvas.getByText(args.title)).toBeInTheDocument();
    await expect(subtitle).toBeVisible();
    await expect(canvas.getByText(args.subtitle)).toBeInTheDocument();
  },
};

export const WithAction: Story = {
  args: {
    action: {
      handler: fn(),
      buttonName: 'Проверить работоспособность кнопки',
    },
  },
  play: async ({ args, canvasElement }) => {
    if (!args.action) {
      throw new Error('Story must provide action');
    }

    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: args.action.buttonName,
    });

    await expect(button).toBeVisible();
    await userEvent.click(button);
    await expect(args.action.handler).toHaveBeenCalledTimes(1);
  },
};
