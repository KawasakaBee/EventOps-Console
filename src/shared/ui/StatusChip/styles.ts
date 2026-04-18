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
      justifyContent: 'center',
      alignItems: 'center',
      gap: 0.5,
      width: 'max-content',
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
      color: type === 'contained' ? 'text.secondary' : 'inherit',
    },
  };
};
