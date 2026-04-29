import { SvgIconComponent } from '@mui/icons-material';

interface IBaseErrorStateProps {
  title: string;
}

interface IErrorStateProps extends IBaseErrorStateProps {
  type: 'state';
  subtitle: string;
  action?: {
    handler: () => void;
    buttonName: string;
  };
  link?: ActionLink['link'];
}

interface ISnackbarErrorProps extends IBaseErrorStateProps {
  type: 'snackbar';
  open: boolean;
  onClose: () => void;
}

interface IDialogErrorProps extends IBaseErrorStateProps {
  type: 'dialog';
  icon?: SvgIconComponent;
  subtitle: string;
  open: boolean;
  onClose: () => void;
  action: ActionButtons | ActionLink;
}

interface ActionButtons {
  buttons: {
    primary: {
      handler: () => void;
      buttonName: string;
    };
    secondary?: {
      handler: () => void;
      buttonName: string;
    };
  };
}

interface ActionLink {
  link: {
    to: string;
    buttonName: string;
  };
}

export type ErrorStateProps =
  | IErrorStateProps
  | ISnackbarErrorProps
  | IDialogErrorProps;
