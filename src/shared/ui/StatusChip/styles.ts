import { SxProps, Theme } from '@mui/material';

type Key = 'statusChipIcon' | 'statusChipWrapper' | 'statusChipLabel';

interface IStyledProps {
  color: string;
  shape: 'rounded' | 'square';
  size: 'small' | 'medium' | 'large';
  type: 'contained' | 'outlined';
}

type Styles = (options: IStyledProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Styles = (options: IStyledProps) => {
  const { color, shape, size, type } = options;

  return {
    statusChipWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 0.5,
      minWidth: size === 'small' ? 100 : size === 'medium' ? 150 : 200,
      border: `1px solid ${color}`,
      borderRadius: shape === 'rounded' ? 1.5 : 0,
      paddingInline: size === 'small' ? 0.5 : size === 'medium' ? 1 : 2,
      paddingBlock: size === 'small' ? 0.5 : size === 'medium' ? 1 : 2,
      bgcolor: type === 'contained' ? 'primary.main' : 'transparent',
    },
    statusChipIcon: {
      fill: color,
    },
    statusChipLabel: {
      mb: 0,
      fontSize: size === 'small' ? 12 : size === 'medium' ? 16 : 20,
      lineHeight: '1.2',
      color: type === 'contained' ? 'text.secondary' : 'inherit',
    },
  };
};
