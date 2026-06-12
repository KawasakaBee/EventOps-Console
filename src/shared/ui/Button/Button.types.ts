import { SxProps, Theme } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

export const variantConfig: Record<ButtonVariant, VariantConfig> = {
  contained: {
    borderColor: 'primary.main',
    hoverBorderColor: 'primary.light',
    disabledBorderColor: 'text.disabled',
    color: 'common.white',
    hoverColor: 'common.white',
    submitBorderColor: 'success.main',
    submitColor: 'common.white',
    submitBgcolor: 'success.main',
    hoverSubmitBorderColor: 'success.darken',
    hoverSubmitBgcolor: 'success.darken',
    dangerBorderColor: 'error.main',
    dangerColor: 'common.white',
    dangerBgcolor: 'error.main',
    hoverDangerBorderColor: 'error.darken',
    hoverDangerBgcolor: 'error.darken',
    bgColor: 'primary.main',
    hoverBgColor: 'primary.light',
    disabledBgColor: 'text.disabled',
    iconColor: 'common.white',
    hoverIconColor: 'common.white',
    disabledIconColor: 'text.disabled',
  },
  outlined: {
    borderColor: 'primary.main',
    hoverBorderColor: 'primary.light',
    disabledBorderColor: 'text.disabled',
    color: 'text.primary',
    hoverColor: 'common.white',
    submitBorderColor: 'success.main',
    submitColor: 'common.white',
    submitBgcolor: 'success.main',
    hoverSubmitBorderColor: 'success.darken',
    hoverSubmitBgcolor: 'success.darken',
    dangerBorderColor: 'error.main',
    dangerColor: 'common.white',
    dangerBgcolor: 'error.main',
    hoverDangerBorderColor: 'error.darken',
    hoverDangerBgcolor: 'error.darken',
    bgColor: 'common.white',
    hoverBgColor: 'primary.light',
    disabledBgColor: 'text.disabled',
    iconColor: 'primary.main',
    hoverIconColor: 'common.white',
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
type ButtonIntent = 'primary' | 'success' | 'danger';

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
  submitBorderColor: string;
  submitColor: string;
  submitBgcolor: string;
  hoverSubmitBorderColor: string;
  hoverSubmitBgcolor: string;
  dangerBorderColor: string;
  dangerColor: string;
  dangerBgcolor: string;
  hoverDangerBorderColor: string;
  hoverDangerBgcolor: string;
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
  intent?: ButtonIntent;
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

export type ButtonProps = IButtonProps | ILinkButtonProps | IIconButtonProps;
