import { FormControl, TextField } from '@mui/material';
import { ISearchInputProps } from './SearchInput.types';
import { styles } from './styles';

const SearchInput: React.FC<ISearchInputProps> = ({
  searchValue,
  label,
  isDisabled,
  handleSearchChange,
}) => {
  const sx = styles();

  return (
    <FormControl sx={sx.formControl}>
      <TextField
        value={searchValue}
        sx={sx.searchInput}
        label={label}
        onChange={handleSearchChange}
        disabled={isDisabled}
      />
    </FormControl>
  );
};
export default SearchInput;
