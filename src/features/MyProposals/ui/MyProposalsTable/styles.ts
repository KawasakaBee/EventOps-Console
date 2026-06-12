import tableSx from '@/shared/styles/tableSx';
import { SxProps, Theme } from '@mui/material';

type Key = 'myProposalsTable';

type IStyleProps = {
  viewportWidth: number;
};

type Style = (options: IStyleProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { viewportWidth } = options;

  return {
    myProposalsTable: tableSx(viewportWidth),
  };
};
