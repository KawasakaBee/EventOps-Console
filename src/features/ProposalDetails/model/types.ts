import { SvgIconComponent } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { ErrorEnvelope } from '@/shared/types/api.types';
import { PageStatus } from '@/shared/types/resource.types';
import { UserListItem } from '@/entities/user/model/types';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';

export const secondaryActions = ['copyLink', 'toHome', 'openHistory'] as const;

export type SecondaryAction = (typeof secondaryActions)[number];

export interface SecondaryActionData {
  type: SecondaryAction;
  icon: SvgIconComponent;
  description: string;
}

export const customButtonsDictionary: SecondaryActionData[] = [
  {
    type: 'copyLink',
    icon: ShareIcon,
    description: 'Скопировать ссылку',
  },
  {
    type: 'toHome',
    icon: HomeIcon,
    description: 'К заявкам',
  },
  {
    type: 'openHistory',
    icon: ScheduleIcon,
    description: 'Открыть историю',
  },
];

export const clipboardError: ErrorEnvelope['error'] = {
  code: 'CLIPBOARD_ERROR',
  message: 'Не удалось скопировать адрес страницы',
};

export const tabsDictionary: Record<ProposalDetailsTab, string> = {
  overview: 'Обзор',
  reviews: 'Ревью',
  comments: 'Комментарии',
  history: 'История',
};

export const proposalDetailsTabs = [
  'overview',
  'reviews',
  'comments',
  'history',
] as const;

export type ProposalDetailsTab = (typeof proposalDetailsTabs)[number];

export interface UsersResource {
  status: PageStatus;
  data: UserListItem[];
}
export interface ProposalResource {
  status: PageStatus;
  errorProps: ErrorStateProps | null;
}
