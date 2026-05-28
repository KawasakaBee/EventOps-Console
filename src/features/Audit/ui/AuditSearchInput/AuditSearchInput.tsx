import { FormControl, TextField } from '@mui/material';
import { IAuditSearchInputProps } from './AuditSearchInput.types';
import { useRef } from 'react';
import { useAppDispatch } from '@/shared/store/hooks';
import { patchAuditFilters } from '../../model/auditSlice';

const AuditSearchInput: React.FC<IAuditSearchInputProps> = ({
  isLoading,
  sxFormControl,
  sxSearchInput,
  searchValue,
}) => {
  const dispatch = useAppDispatch();

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    dispatch(patchAuditFilters({ search: value || null }));
  };

  return (
    <FormControl sx={sxFormControl}>
      <TextField
        value={searchValue}
        sx={sxSearchInput}
        label="Поиск по ID действия или ID сущности"
        inputRef={searchInputRef}
        onChange={handleSearchChange}
        disabled={isLoading}
      />
    </FormControl>
  );
};

export default AuditSearchInput;
