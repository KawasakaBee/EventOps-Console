import { debounce, FormControl, TextField } from '@mui/material';
import { IProposalSearchInputProps } from './ProposalSearchInput.types';
import { useEffect, useMemo, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const ProposalSearchInput: React.FC<IProposalSearchInputProps> = ({
  isLoading,
  sxFormControl,
  sxSearchInput,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFromParams = searchParams.get('search') ?? '';

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const debouncedValue = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const trimmedValue = value.trim();

        if (trimmedValue) {
          params.set('search', trimmedValue);
        } else {
          params.delete('search');
        }

        params.set('page', '1');

        router.push(`${pathname}?${params.toString()}`);
      }, 400),
    [pathname, router, searchParams],
  );

  useEffect(() => {
    return () => {
      debouncedValue.clear();
    };
  }, [debouncedValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debouncedValue(value);
  };

  return (
    <FormControl sx={sxFormControl}>
      <TextField
        key={searchFromParams}
        defaultValue={searchFromParams}
        sx={sxSearchInput}
        label="Поиск по названию"
        inputRef={searchInputRef}
        onChange={handleSearchChange}
        disabled={isLoading}
      />
    </FormControl>
  );
};

export default ProposalSearchInput;
