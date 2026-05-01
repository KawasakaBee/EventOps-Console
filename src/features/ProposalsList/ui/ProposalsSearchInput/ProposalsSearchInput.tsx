import { FormControl, TextField } from '@mui/material';
import { IProposalsSearchInputProps } from './ProposalsSearchInput.types';
import { useRef } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { patchFilters } from '@/features/ProposalsList/model/proposalsFiltersSlice';

const ProposalsSearchInput: React.FC<IProposalsSearchInputProps> = ({
  isLoading,
  sxFormControl,
  sxSearchInput,
  searchValue,
}) => {
  const dispatch = useAppDispatch();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(patchFilters({ search: value || null }));
  };

  return (
    <FormControl sx={sxFormControl}>
      <TextField
        value={searchValue}
        sx={sxSearchInput}
        label="Поиск по названию"
        inputRef={searchInputRef}
        onChange={handleSearchChange}
        disabled={isLoading}
      />
    </FormControl>
  );
};

export default ProposalsSearchInput;
