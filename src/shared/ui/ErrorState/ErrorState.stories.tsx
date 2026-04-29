import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ErrorState from './ErrorState';
import { expect, within, userEvent, fn, screen, waitFor } from 'storybook/test';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const meta = {
  title: 'Shared UI/ErrorState',
  component: ErrorState,
  args: {
    type: 'state',
    title: 'Тестовый Error State',
    subtitle: 'Текст, уведомляющий об ошибке',
  },
  argTypes: {
    type: { control: false },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: {
    type: 'state',
    title: 'Тестовый Error State',
    subtitle: 'Текст, уведомляющий об ошибке',
  },
  play: async ({ args, canvasElement }) => {
    if (args.type !== 'state') return;
    const canvas = within(canvasElement);
    const title = canvas.getByTestId('error-state-title');
    const subtitle = canvas.getByTestId('error-state-subtitle');

    await expect(title).toBeVisible();
    await expect(canvas.getByText(args.title)).toBeInTheDocument();
    await expect(subtitle).toBeVisible();
    await expect(canvas.getByText(args.subtitle)).toBeInTheDocument();
  },
};

export const InlineWithActionAndLink: Story = {
  args: {
    type: 'state',
    title: 'Тестовый Error State',
    subtitle: 'Текст, уведомляющий об ошибке',
    action: {
      handler: fn(),
      buttonName: 'Перезагрузить страницу',
    },
    link: {
      to: 'https://example.com/',
      buttonName: 'Перейти на другую страницу',
    },
  },
  play: async ({ args, canvasElement }) => {
    if (args.type !== 'state') return;
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

    if (!('link' in args)) return;

    const linkButton = screen.getByRole('link', {
      name: /Перейти на другую страницу/i,
    });

    await expect(linkButton).toHaveAttribute('href', args.link?.to);
  },
};

export const SnackbarOpened: Story = {
  args: {
    type: 'snackbar',
    title: 'Тестовый snackbar',
    open: true,
    onClose: fn(),
  },
  play: async ({ args, canvasElement }) => {
    if (args.type !== 'snackbar') return;
    const canvas = within(canvasElement);

    const snackbar = canvas.getByTestId('error-state-snackbar');

    const closeButton = within(snackbar).getByRole('button', {
      name: /кнопка закрытия снэкбара/i,
    });

    await userEvent.click(closeButton);
    await expect(args.onClose).toHaveBeenCalledTimes(1);
  },
};

export const SnackbarClosed: Story = {
  args: {
    type: 'snackbar',
    title: 'Тестовый snackbar',
    open: false,
    onClose: fn(),
  },
  play: async ({ args, canvasElement }) => {
    if (args.type !== 'snackbar') return;
    const canvas = within(canvasElement);
    const snackbar = canvas.queryByTestId('error-state-snackbar');

    await expect(snackbar).not.toBeInTheDocument();
  },
};

export const DialogButtons: Story = {
  args: {
    type: 'dialog',
    title: 'Тестовый Error State',
    subtitle: 'Текст, уведомляющий об ошибке',
    icon: PriorityHighIcon,
    open: true,
    onClose: fn(),
    action: {
      buttons: {
        primary: {
          handler: fn(),
          buttonName: 'Принять',
        },
        secondary: {
          handler: fn(),
          buttonName: 'Отменить',
        },
      },
    },
  },
  play: async ({ args }) => {
    if (args.type !== 'dialog') return;
    const dialog = await screen.findByTestId('error-state-dialog');

    await expect(dialog).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText(args.title)).toBeVisible();
      expect(screen.getByText(args.subtitle)).toBeVisible();
    });

    if (!('buttons' in args.action)) return;

    const primaryButton = screen.getByRole('button', { name: /Принять/i });

    await userEvent.click(primaryButton);
    await expect(args.action.buttons.primary.handler).toHaveBeenCalledTimes(1);

    const secondaryButton = screen.getByRole('button', { name: /Отменить/i });

    if (!args.action.buttons.secondary) return;

    await userEvent.click(secondaryButton);
    await expect(args.action.buttons.secondary.handler).toHaveBeenCalledTimes(
      1,
    );
  },
};

export const DialogLink: Story = {
  args: {
    type: 'dialog',
    title: 'Тестовый Error State',
    subtitle: 'Текст, уведомляющий об ошибке',
    icon: PriorityHighIcon,
    open: true,
    onClose: fn(),
    action: {
      link: {
        to: 'https://example.com/',
        buttonName: 'Перейти на другую страницу',
      },
    },
  },
  play: async ({ args }) => {
    if (args.type !== 'dialog') return;
    const dialog = await screen.findByTestId('error-state-dialog');

    await expect(dialog).toBeVisible();

    await waitFor(() => {
      expect(screen.getByText(args.title)).toBeVisible();
      expect(screen.getByText(args.subtitle)).toBeVisible();
    });

    if (!('link' in args.action)) return;

    const linkButton = screen.getByRole('link', {
      name: /Перейти на другую страницу/i,
    });

    await expect(linkButton).toHaveAttribute('href', args.action.link.to);
  },
};
