import { SvgIconComponent } from '@mui/icons-material';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { ErrorEnvelope } from '@/shared/types/api.types';
import { proposalActions } from '@/entities/proposal/model/types';

export const criticalActions = proposalActions.filter(
  (action) =>
    action === 'edit' ||
    action === 'submit' ||
    action === 'accept' ||
    action === 'reject',
);

export type CriticalAction = (typeof criticalActions)[number];

export const additionalActions = proposalActions.filter(
  (action) =>
    action === 'addComment' ||
    action === 'assignReviewer' ||
    action === 'addReview' ||
    action === 'requestChanges' ||
    action === 'schedule' ||
    action === 'changeStatus',
);

export type AdditionalAction = (typeof additionalActions)[number];

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
