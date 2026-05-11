import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PageHeader from './PageHeader';
import { expect, within } from 'storybook/test';
import { breadcrumbsDictionary } from '@/shared/lib/routes/dictionary';

const meta = {
  title: 'Shared UI/PageHeader',
  args: {
    mode: 'outer',
    pageName: 'Мои заявки',
    title: 'Тестовый заголовок Page Header',
    children: 'Описание заголовка',
  },
  argTypes: {
    mode: { control: false },
  },
  component: PageHeader,
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OuterPageHeader: Story = {
  args: {
    mode: 'outer',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const pageName = canvas.getByText(`${args.pageName}`);
    const title = canvas.getByText(`${args.title}`);
    const children = canvas.getByText(`${args.children}`);

    await expect(canvasElement).toBeVisible();
    await expect(pageName).toBeInTheDocument();
    await expect(title).toBeInTheDocument();
    await expect(children).toBeInTheDocument();
  },
};

export const InnerPageHeader: Story = {
  args: {
    mode: 'inner',
    to: '/analytics',
  },
  play: async ({ args, canvasElement }) => {
    if (args.mode !== 'inner') return;

    const canvas = within(canvasElement);
    const backButton = canvas.getByRole('link', {
      name: `Назад в ${breadcrumbsDictionary[args.to]}`,
    });

    await expect(backButton).toBeInTheDocument();
    await expect(backButton).toHaveAttribute('href', args.to);
  },
};
