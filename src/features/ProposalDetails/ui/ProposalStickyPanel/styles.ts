import getResponsiveValue from '@/shared/utils/getResponsiveValue';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/system';

type Key =
  | 'proposalStickyPanelStatusWrap'
  | 'proposalStickyPanelLastUpdateTime'
  | 'proposalStickyPanelActionButton'
  | 'proposalStickyPanelSkeletonButton';

interface IStyleOptionProps {
  isDesktop: boolean;
  isLaptop: boolean;
  viewportWidth: number;
}

type Style = (options: IStyleOptionProps) => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = (options) => {
  const { isDesktop, isLaptop, viewportWidth } = options;
  return {
    proposalStickyPanelStatusWrap: {
      alignItems: 'flex-start',
    },
    proposalStickyPanelLastUpdateTime: {
      opacity: 0.5,
    },
    proposalStickyPanelActionButton: {
      width: 1,
      minWidth: isDesktop
        ? getResponsiveValue(220, 160, 1920, 1440, viewportWidth)
        : isLaptop
          ? getResponsiveValue(160, 140, 1920, 1440, viewportWidth)
          : 140,
      fontSize: isDesktop
        ? getResponsiveValue(16, 14, 1920, 1440, viewportWidth)
        : isLaptop
          ? getResponsiveValue(14, 12, 1920, 1440, viewportWidth)
          : 12,
    },
    proposalStickyPanelSkeletonButton: {
      height: 60,
    },
  };
};
