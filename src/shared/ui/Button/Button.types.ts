import { SxProps, Theme } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

export const variantConfig: Record<ButtonVariant, VariantConfig> = {
  contained: {
    borderColor: 'primary.main',
    hoverBorderColor: 'primary.light',
    disabledBorderColor: 'text.disabled',
    color: 'text.secondary',
    hoverColor: 'text.secondary',
    bgColor: 'primary.main',
    hoverBgColor: 'primary.light',
    disabledBgColor: 'text.disabled',
    iconColor: 'text.secondary',
    hoverIconColor: 'text.secondary',
    disabledIconColor: 'text.disabled',
  },
  outlined: {
    borderColor: 'primary.main',
    hoverBorderColor: 'primary.light',
    disabledBorderColor: 'text.disabled',
    color: 'text.primary',
    hoverColor: 'text.secondary',
    bgColor: 'text.secondary',
    hoverBgColor: 'primary.light',
    disabledBgColor: 'text.disabled',
    iconColor: 'primary.main',
    hoverIconColor: 'text.secondary',
    disabledIconColor: 'text.disabled',
  },
};

export const sizeConfig: Record<ButtonSize, SizeConfig> = {
  small: {
    minWidth: 180,
    paddingBlock: 1,
    paddingInline: 0.5,
    fontSize: 14,
    iconFontSize: 16,
  },
  medium: {
    minWidth: 220,
    paddingBlock: 1.5,
    paddingInline: 1,
    fontSize: 16,
    iconFontSize: 20,
  },
  large: {
    minWidth: 260,
    paddingBlock: 2.5,
    paddingInline: 1.5,
    fontSize: 18,
    iconFontSize: 24,
  },
};

export type ButtonVariant = 'contained' | 'outlined';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface VariantConfig {
  borderColor: string;
  hoverBorderColor: string;
  disabledBorderColor: string;
  color: string;
  hoverColor: string;
  bgColor: string;
  hoverBgColor: string;
  disabledBgColor: string;
  iconColor: string;
  hoverIconColor: string;
  disabledIconColor: string;
}

export interface SizeConfig {
  paddingBlock: number;
  paddingInline: number;
  minWidth: number;
  fontSize: number;
  iconFontSize: number;
}

interface IBaseProps {
  variant: ButtonVariant;
  size: ButtonSize;
  isDisableElevation?: boolean;
  sx?: SxProps<Theme>;
}

export interface IButtonProps extends IBaseProps {
  mode: 'button';
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  isDisabled?: boolean;
  startIcon?: SvgIconComponent | null;
  endIcon?: SvgIconComponent | null;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ILinkButtonProps extends IBaseProps {
  mode: 'link';
  children: React.ReactNode;
  to: string;
  isRelativeLink?: boolean;
  isNewTab?: boolean;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export interface IIconButtonProps extends IBaseProps {
  mode: 'iconButton';
  ariaLabel: string;
  icon: SvgIconComponent;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type IButton = IButtonProps | ILinkButtonProps | IIconButtonProps;
