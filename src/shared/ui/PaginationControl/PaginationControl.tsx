import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/shared/config/layout';
import { MenuItem, Pagination, Select, Stack } from '@mui/material';
import { styles } from './styles';
import { IPaginationControlProps } from './PaginationControl.types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import parsePositiveInt from '@/shared/utils/parsePositiveInt';
import { PageSize } from '@/shared/types/primitives.types';
import { isPageSize } from '@/shared/utils/typeGuards';

const PaginationControl: React.FC<IPaginationControlProps> = ({
  totalPages = 1,
  isDisabled,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPage = useMemo(
    () => parsePositiveInt(searchParams.get('page'), 1),
    [searchParams],
  );

  const selectedPageSize = useMemo((): PageSize => {
    const queryPageSize = searchParams.get('pageSize');

    if (!queryPageSize) return DEFAULT_PAGE_SIZE;

    const parsedPageSize = Number(queryPageSize);

    if (!isPageSize(parsedPageSize)) return DEFAULT_PAGE_SIZE;

    return parsedPageSize;
  }, [searchParams]);

  const sx = styles();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', String(page));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageSizeChange = (value: unknown) => {
    const pageSize = Number(value);

    if (!isPageSize(pageSize)) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set('pageSize', String(pageSize));
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Stack direction="row" spacing={4} sx={sx.paginationWrapper}>
      <Pagination
        count={totalPages}
        page={selectedPage}
        disabled={isDisabled}
        onChange={(_, page) => handlePageChange(page)}
        data-testid="page-pagination"
      />
      <Select
        value={selectedPageSize}
        onChange={(event) => handlePageSizeChange(event.target.value)}
        disabled={isDisabled}
        aria-label="Выбор размера страницы"
      >
        {PAGE_SIZE_OPTIONS.map((option) => (
          <MenuItem key={`Select-option-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};
export default PaginationControl;
