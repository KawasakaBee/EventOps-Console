import type { SxProps, Theme } from '@mui/material';

type Key =
  | 'speakersStepCountWrap'
  | 'speakerBlockEmailClue'
  | 'speakersStepTextField';

type Style = () => {
  readonly [key in Key]: SxProps<Theme>;
};

export const styles: Style = () => {
  return {
    speakersStepCountWrap: {
      alignItems: 'center',
    },
    speakerBlockEmailClue: {
      mt: 0,
      opacity: 0.5,
    },
    speakersStepTextField: {
      borderColor: 'neutral.main',

      '& fieldset': {
        borderColor: 'neutral.main',
      },

      '& .MuiInputBase-input[readonly]': {
        cursor: 'default',
      },

      '& .MuiOutlinedInput-root:has(input[readonly]):hover .MuiOutlinedInput-notchedOutline':
        {
          borderColor: 'neutral.main',
        },

      '& .MuiOutlinedInput-root:has(input[readonly]):focus .MuiOutlinedInput-notchedOutline':
        {
          borderColor: 'neutral.main',
        },

      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'neutral.main',
        borderWidth: '1px',
      },

      '& .MuiOutlinedInput-root:has(input[readonly])': {
        backgroundColor: 'action.hover',
      },
    },
  };
};
