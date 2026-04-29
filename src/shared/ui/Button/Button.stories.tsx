import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HomeIcon from '@mui/icons-material/Home';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from './Button';
import { expect, fn, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Shared UI/Button',
  component: Button,
  args: {
    mode: 'button',
    variant: 'contained',
    size: 'medium',
    children: 'Button',
    isDisabled: false,
    ariaLabel: 'Test Button',
    onClick: fn(),
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['button', 'link', 'iconButton'],
    },
    variant: {
      control: 'inline-radio',
      options: ['contained', 'outlined'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    mode: 'button',
    children: 'Button',
    variant: 'contained',
    size: 'medium',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('custom-button');

    await expect(button).toBeVisible();
    if ('children' in args) {
      await expect(canvas.getByText(String(args.children))).toBeInTheDocument();
    }
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const DisabledButton: Story = {
  args: {
    mode: 'button',
    children: 'Disabled Button',
    variant: 'contained',
    size: 'medium',
    isDisabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByTestId('custom-button');

    const isInteracted = getComputedStyle(button).pointerEvents === 'none';

    if (!isInteracted) {
      await userEvent.click(button);
      await expect(args.onClick).not.toHaveBeenCalled();
    } else expect(getComputedStyle(button).pointerEvents).toBe('none');
  },
};

export const ButtonWithIcon: Story = {
  args: {
    mode: 'button',
    children: 'Button',
    variant: 'contained',
    size: 'medium',
    startIcon: HomeIcon,
    endIcon: ArrowForwardIcon,
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByTestId('custom-button');

    expect(button.querySelector('svg')).not.toBeNull();
  },
};

export const OutlinedButton: Story = {
  args: {
    mode: 'button',
    children: 'Button',
    variant: 'outlined',
    size: 'medium',
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByTestId('custom-button');

    await expect(getComputedStyle(button).borderColor).toBe('rgb(9, 59, 103)');
    await expect(getComputedStyle(button).color).toBe('rgb(10, 10, 10)');
    await expect(getComputedStyle(button).backgroundColor).toBe(
      'rgb(255, 255, 255)',
    );
  },
};

export const LinkButton: Story = {
  args: {
    mode: 'link',
    children: 'Link',
    to: 'https://example.com/',
    isRelativeLink: false,
    isNewTab: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('custom-button');

    if ('to' in args) {
      await expect(button).toHaveAttribute('href', args.to);
    }
    if ('isNewTab' in args) {
      if (args.isNewTab) {
        await expect(button).toHaveAttribute('target', '_blank');
      } else await expect(button).toHaveAttribute('target', '_self');
    }
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

export const IconButton: Story = {
  args: {
    mode: 'iconButton',
    icon: HomeIcon,
    ariaLabel: 'Icon Button',
  },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByTestId('custom-button');

    expect(button.querySelector('svg')).not.toBeNull();
    await expect(getComputedStyle(button).borderRadius).toBe('50%');
  },
};
