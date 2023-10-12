import { Box } from '@mui/material';
import React from 'react';
import { colors } from '../../styles/variables';

interface BottomActionBoxProps {
  children: React.ReactNode;
}

const BottomActionBox = ({ children }: BottomActionBoxProps) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        maxWidth: '100vw',
        padding: '1rem',
        borderTop: `2px solid ${colors.borderPrimary}`,
        backgroundColor: colors.white1000,
      }}
    >
      {children}
    </Box>
  );
};

export default BottomActionBox;
