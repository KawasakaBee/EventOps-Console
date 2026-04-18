import {
  IconButton,
  Button as MuiButton,
  Link as MuiLink,
} from '@mui/material';
import { IButton, sizeConfig, variantConfig } from './Button.types';
import { FC } from 'react';
import Link from 'next/link';

const Button: FC<IButton> = (props) => {
  const { mode, variant, size, ariaLabel, isDisableElevation, sx, onClick } =
    props;

  const {
    borderColor,
    hoverBorderColor,
    disabledBorderColor,
    color,
    hoverColor,
    bgColor,
    hoverBgColor,
    disabledBgColor,
    iconColor,
    hoverIconColor,
    disabledIconColor,
  } = variantConfig[variant];
  const { minWidth, paddingBlock, paddingInline, fontSize, iconFontSize } =
    sizeConfig[size];

  const commonButtonStyles = {
    minWidth,
    paddingBlock,
    paddingInline,
    border: '1px solid',
    borderColor,
    borderRadius: 1.5,
    fontSize,
    lineHeight: '1.2',
    letterSpacing: '-0.05em',
    color,
    bgcolor: bgColor,
    '&:hover': {
      borderColor: hoverBorderColor,
      color: hoverColor,
      bgcolor: hoverBgColor,
      '& .MuiSvgIcon-root': {
        color: hoverIconColor,
      },
    },
    '&.Mui-disabled': {
      borderColor: disabledBorderColor,
      bgcolor: disabledBgColor,
      '& .MuiSvgIcon-root': {
        color: disabledIconColor,
      },
    },
  };

  const commonIconStyles = {
    width: iconFontSize,
    height: iconFontSize,
    color: iconColor,
  };

  if (mode === 'link') {
    const { children, to, isRelativeLink = true, isNewTab } = props;

    const newTab = isNewTab ? '_blank' : '_self';

    return (
      <MuiLink
        href={to}
        component={isRelativeLink ? Link : 'a'}
        target={newTab}
        onClick={onClick}
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        underline="none"
        data-testid="custom-button"
        sx={{
          ...commonButtonStyles,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          ...sx,
        }}
      >
        {children}
      </MuiLink>
    );
  }

  if (mode === 'iconButton') {
    const { icon, isDisabled } = props;
    const IconComponent = icon;

    return (
      <IconButton
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={isDisabled}
        data-testid="custom-button"
        sx={{
          ...commonButtonStyles,
          minWidth: 'unset',
          padding: sizeConfig[size].paddingInline,
          borderRadius: '50%',
          ...sx,
        }}
      >
        <IconComponent sx={commonIconStyles} />
      </IconButton>
    );
  }

  const {
    children,
    type = 'button',
    isDisabled,
    startIcon: StartIconComponent,
    endIcon: EndIconComponent,
  } = props;

  return (
    <MuiButton
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={isDisabled}
      disableElevation={isDisableElevation}
      type={type}
      startIcon={
        StartIconComponent && <StartIconComponent sx={commonIconStyles} />
      }
      endIcon={EndIconComponent && <EndIconComponent sx={commonIconStyles} />}
      sx={{ ...commonButtonStyles, ...sx }}
      data-testid="custom-button"
    >
      {children}
    </MuiButton>
  );
};

export default Button;
