import { Meta, StoryObj } from '@storybook/nextjs-vite';
import SearchInput from './SearchInput';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ChangeEvent, useState } from 'react';

const meta = {
  title: 'Shared UI/SearchInput',
  component: SearchInput,
  args: {
    searchValue: '',
    label: 'Поиск по имени',
    handleSearchChange: fn(),
    isDisabled: false,
  },
  argTypes: {
    searchValue: { control: 'text' },
    label: { control: 'text' },
    handleSearchChange: { control: false },
    isDisabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState(args.searchValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      args.handleSearchChange();

      setSearchValue(event.target.value);
    };

    return (
      <SearchInput
        {...args}
        handleSearchChange={handleChange}
        searchValue={searchValue}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    const newValue = 'Новый элемент поиска';

    await expect(input).toBeInTheDocument();
    await userEvent.type(input, newValue);
    await expect(input).toHaveValue(newValue);
  },
};

export const DisabledInput: Story = {
  args: {
    isDisabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    const isInteracted = getComputedStyle(input).pointerEvents === 'none';

    if (!isInteracted) {
      const newValue = 'Новый элемент поиска';

      await expect(input).toBeInTheDocument();
      await userEvent.type(input, newValue);
      await expect(input).not.toHaveValue(newValue);
    } else expect(getComputedStyle(input).pointerEvents).toBe('none');
  },
};
