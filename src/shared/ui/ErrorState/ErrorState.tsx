import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  SnackbarContent,
  Stack,
  Typography,
} from '@mui/material';
import { ErrorStateProps } from './ErrorState.types';
import { styles } from './styles';
import Button from '../Button/Button';
import CloseIcon from '@mui/icons-material/Close';

const ErrorState: React.FC<ErrorStateProps> = (props) => {
  const { type, title } = props;

  const sx = styles();

  if (type === 'state') {
    const { subtitle, action, link } = props;

    return (
      <Stack spacing={2} sx={sx.errorStateContainer}>
        <Typography variant="h2" data-testid="error-state-title">
          {title}
        </Typography>
        <Typography variant="body1" data-testid="error-state-subtitle">
          {subtitle}
        </Typography>
        {action && (
          <Button
            mode="button"
            variant="contained"
            size="medium"
            onClick={action.handler}
          >
            {action.buttonName}
          </Button>
        )}
        {link && (
          <Button
            mode="link"
            variant="contained"
            size="medium"
            to={link.to}
            isRelativeLink
          >
            {link.buttonName}
          </Button>
        )}
      </Stack>
    );
  }

  if (type === 'snackbar') {
    const { open, onClose } = props;

    return (
      <Snackbar open={open} sx={sx.snackbar}>
        <SnackbarContent
          message={title}
          action={
            <Button
              mode="iconButton"
              variant="outlined"
              size="small"
              ariaLabel="Кнопка закрытия снэкбара"
              icon={CloseIcon}
              onClick={onClose}
            />
          }
          data-testid="error-state-snackbar"
        />
      </Snackbar>
    );
  }

  if (type === 'dialog') {
    const { icon: SvgIcon, open, onClose, subtitle, action } = props;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: sx.dialogPaper,
          },
        }}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
        data-testid="error-state-dialog"
      >
        <DialogTitle sx={sx.dialogTitleWrapper} id="error-dialog-title">
          {SvgIcon && <SvgIcon />}

          {title}
        </DialogTitle>
        <DialogContent id="error-dialog-description">{subtitle}</DialogContent>
        <DialogActions sx={sx.dialogActions}>
          {'link' in action ? (
            <Button
              mode="link"
              variant="contained"
              size="medium"
              to={action.link.to}
              isRelativeLink
            >
              {action.link.buttonName}
            </Button>
          ) : (
            <Box sx={sx.dialogButtons}>
              <Button
                mode="button"
                variant="contained"
                size="medium"
                onClick={action.buttons.primary.handler}
              >
                {action.buttons.primary.buttonName}
              </Button>
              {action.buttons.secondary && (
                <Button
                  mode="button"
                  variant="outlined"
                  size="medium"
                  onClick={action.buttons.secondary.handler}
                >
                  {action.buttons.secondary.buttonName}
                </Button>
              )}
            </Box>
          )}
        </DialogActions>
      </Dialog>
    );
  }
};

export default ErrorState;
