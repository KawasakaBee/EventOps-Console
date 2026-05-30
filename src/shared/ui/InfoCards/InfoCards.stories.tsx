import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InfoCards from './InfoCards';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Shared UI/InfoCards',
  component: InfoCards,
  args: {
    items: [
      { label: 'Всего заявок:', value: 30 },
      { label: 'Страница:', value: 2 },
      { label: 'Заявок на странице:', value: 5 },
      { label: 'Активные фильтры:', value: 0 },
    ],
    isLoading: false,
  },
  argTypes: {
    items: { control: false },
    isLoading: { control: 'boolean' },
  },
} satisfies Meta<typeof InfoCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultCard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    for (const item of args.items) {
      const cardLabel = canvas.getByText(item.label);

      await expect(cardLabel).toBeVisible();

      const value = item.value;

      if (value != null) {
        const cardValue = canvas.getByText(value);

        await expect(cardValue).toBeVisible();
      }
    }
  },
};

export const ErrorCard: Story = {
  args: {
    items: [
      { label: 'Всего заявок:', value: undefined },
      { label: 'Страница:', value: null },
      { label: 'Заявок на странице:', value: 0 },
      { label: 'Активные фильтры:', value: undefined },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    for (const item of args.items) {
      const cardLabel = canvas.getByText(item.label);

      await expect(cardLabel).toBeVisible();

      const value = item.value;

      if (value != null) {
        const cardValue = canvas.getByText(value);

        await expect(cardValue).toBeVisible();
      }
    }

    const failedItemsCount = args.items.filter(
      (item) => item.value == null,
    ).length;

    const errors = canvas.getAllByText('Не удалось загрузить данные');

    await expect(errors).toHaveLength(failedItemsCount);

    for (const error of errors) {
      await expect(error).toBeVisible();
    }
  },
};

export const LoadingCard: Story = {
  args: {
    isLoading: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    for (const item of args.items) {
      const cardLabel = canvas.getByText(item.label);

      await expect(cardLabel).toBeVisible();

      const skeleton = canvas.getByTestId(`skeleton-${item.label}`);

      await expect(skeleton).toBeInTheDocument();
    }
  },
};
