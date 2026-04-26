import DraftsIcon from '@mui/icons-material/Drafts';
import EmailIcon from '@mui/icons-material/Email';
import PreviewIcon from '@mui/icons-material/Preview';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const statusChipConfig = {
  draft: {
    label: 'Черновик',
    color: 'neutral',
    icon: DraftsIcon,
  },
  submitted: {
    label: 'Отправлена',
    color: 'info',
    icon: EmailIcon,
  },
  in_review: {
    label: 'На ревью',
    color: 'warning',
    icon: PreviewIcon,
  },
  changes_requested: {
    label: 'Запрошены изменения',
    color: 'orange',
    icon: SettingsIcon,
  },
  accepted: {
    label: 'Принята',
    color: 'success',
    icon: CheckIcon,
  },
  rejected: {
    label: 'Отклонена',
    color: 'error',
    icon: ClearIcon,
  },
  scheduled: {
    label: 'В расписании',
    color: 'purple',
    icon: CalendarMonthIcon,
  },
} as const;

export type Status = keyof typeof statusChipConfig;

export interface IStatusChipProps {
  status: Status;
  type: 'contained' | 'outlined';
  size: 'small' | 'medium' | 'large';
  shape: 'rounded' | 'square';
}
