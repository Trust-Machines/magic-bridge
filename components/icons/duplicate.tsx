import React, { useCallback } from 'react';
import { Box, BoxProps } from '@nelson-ui/react';
import { useClipboard } from '../../common/hooks/use-clipboard';

interface DuplicateProps extends BoxProps {
  clipboardText?: string;
}

export const DuplicateIcon: React.FC<DuplicateProps> = ({ clipboardText, ...props }) => {
  const { copy } = useClipboard();
  const onClick = useCallback(() => {
    if (clipboardText) {
      void copy(clipboardText);
    }
  }, [copy, clipboardText]);
  return (
    <Box {...props} cursor={clipboardText ? 'pointer' : 'default'} onClick={onClick}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
          stroke="#9a9a9a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33325 9.99967H2.66659C2.31296 9.99967 1.97382 9.8592 1.72378 9.60915C1.47373 9.3591 1.33325 9.01996 1.33325 8.66634V2.66634C1.33325 2.31272 1.47373 1.97358 1.72378 1.72353C1.97382 1.47348 2.31296 1.33301 2.66659 1.33301H8.66659C9.02021 1.33301 9.35935 1.47348 9.60939 1.72353C9.85944 1.97358 9.99992 2.31272 9.99992 2.66634V3.33301"
          stroke="#9a9a9a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};
