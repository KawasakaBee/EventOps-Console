import Button from '@/shared/ui/Button/Button';
import { Box, Snackbar, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { styles } from './styles';
import {
  clipboardError,
  customButtonsDictionary,
  SecondaryAction,
} from '../../model/actions';
import { SvgIconComponent } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ErrorStateProps } from '@/shared/ui/ErrorState/ErrorState.types';
import getProposalErrorState from '../../model/getProposalErrorState';
import ErrorState from '@/shared/ui/ErrorState/ErrorState';

const SecondaryStickyButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pageErrorProps, setPageErrorProps] = useState<ErrorStateProps | null>(
    null,
  );
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  const sx = styles();

  const handleUrlCopy = async () => {
    setPageErrorProps(null);
    setIsSnackbarOpen(false);

    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsSnackbarOpen(true);
    } catch {
      setPageErrorProps(
        getProposalErrorState(clipboardError, {
          retry: () => null,
          onClose: () => setPageErrorProps(null),
        }),
      );
    }
  };

  const handleBackToProposals = () => {
    router.push('/proposals');
  };

  const handleHistoryOpen = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', 'history');

    router.replace(`${pathname}?${params.toString()}`);
  };

  const customActionHandlers: Record<
    SecondaryAction,
    () => Promise<void> | void
  > = {
    copyLink: handleUrlCopy,
    toHome: handleBackToProposals,
    openHistory: handleHistoryOpen,
  };

  const customAction = (
    icon: SvgIconComponent,
    description: string,
    action: () => void,
  ) => {
    return (
      <Tooltip title={description} placement="top">
        <Box>
          <Button
            mode="iconButton"
            variant="contained"
            size="small"
            ariaLabel={`Кнопка ${description}`}
            icon={icon}
            onClick={action}
          />
        </Box>
      </Tooltip>
    );
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body1">Быстрые действия</Typography>
      <Stack spacing={1} direction="row">
        {customButtonsDictionary.map((item) => {
          return (
            <Box key={item.type}>
              {customAction(
                item.icon,
                item.description,
                customActionHandlers[item.type],
              )}
            </Box>
          );
        })}
        {pageErrorProps && <ErrorState {...pageErrorProps} />}
      </Stack>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message="Ссылка уcпешно скопирована!"
        sx={sx.snackbar}
      />
    </Stack>
  );
};

export default SecondaryStickyButtons;
