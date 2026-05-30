export interface ISearchInputProps {
  searchValue: string;
  label: string;
  isDisabled: boolean;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
