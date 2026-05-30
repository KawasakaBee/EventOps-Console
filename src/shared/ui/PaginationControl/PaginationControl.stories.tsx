import { Meta, StoryObj } from '@storybook/nextjs-vite';
import PaginationControl from './PaginationControl';
import { expect, userEvent, within, screen } from 'storybook/test';
import { getRouter } from '@storybook/nextjs-vite/navigation.mock';

const meta = {
  title: 'Shared UI/PaginationControl',
  component: PaginationControl,
  args: {
    totalPages: 20,
    isDisabled: false,
  },
  argTypes: {
    totalPages: { control: 'number' },
    isDisabled: { control: 'boolean' },
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/proposals',
      },
      query: {
        page: '1',
        pageSize: '20',
      },
    },
  },
} satisfies Meta<typeof PaginationControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPagination: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const router = getRouter();

    router.push.mockClear();

    const pagePagination = canvas.queryByTestId('page-pagination');
    const pageSizeSelect = canvas.getByRole('combobox');

    await expect(pagePagination).toBeInTheDocument();
    await expect(pageSizeSelect).toBeInTheDocument();

    if (pagePagination) {
      const paginationItem = await screen.findByRole('button', {
        name: 'Go to page 2',
      });

      await userEvent.click(paginationItem);

      await expect(router.push).toHaveBeenCalledTimes(1);
      await expect(router.push).toHaveBeenCalledWith(
        expect.stringContaining('page=2'),
      );
    }

    if (pageSizeSelect) {
      router.push.mockClear();

      await userEvent.click(pageSizeSelect);

      const option = await screen.findByRole('option', { name: '10' });

      await userEvent.click(option);

      await expect(router.push).toHaveBeenCalledTimes(1);
      await expect(router.push).toHaveBeenCalledWith(
        expect.stringContaining('pageSize=10'),
      );
    }
  },
};

export const DisabledPagination: Story = {
  args: {
    totalPages: 10,
    isDisabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const router = getRouter();

    router.push.mockClear();

    const pagePagination = canvas.queryByTestId('page-pagination');
    const pageSizeSelect = canvas.getByRole('combobox');

    if (pagePagination) {
      const paginationItem = await screen.findByRole('button', {
        name: 'Go to page 2',
      });

      const isInteracted =
        getComputedStyle(paginationItem).pointerEvents === 'none';

      if (!isInteracted) {
        await userEvent.click(paginationItem);
        await expect(router.push).not.toHaveBeenCalled();
      } else
        expect(getComputedStyle(paginationItem).pointerEvents).toBe('none');
    }

    if (pageSizeSelect) {
      router.push.mockClear();

      await userEvent.click(pageSizeSelect);

      const isInteracted =
        getComputedStyle(pageSizeSelect).pointerEvents === 'none';

      if (!isInteracted) {
        await userEvent.click(pageSizeSelect);
        await expect(router.push).not.toHaveBeenCalled();
      } else
        expect(getComputedStyle(pageSizeSelect).pointerEvents).toBe('none');
    }
  },
};
