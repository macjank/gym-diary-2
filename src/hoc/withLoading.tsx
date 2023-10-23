import { CircularProgress, Stack, Typography } from '@mui/material';
import { ComponentType, FC } from 'react';

interface WithLoadingProps {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

const withLoading = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithLoading: FC<P & WithLoadingProps> = (props: WithLoadingProps) => {
    const { isLoading, isError, errorMessage, ...rest } = props;

    if (isLoading) {
      return (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress />;
        </Stack>
      );
    }

    if (isError) {
      return (
        <Stack justifyContent="center" alignItems="center">
          <Typography color="error">{errorMessage || 'An error occurred. Please try again later.'}</Typography>;
        </Stack>
      );
    }

    return <WrappedComponent {...(rest as P)} />;
  };

  return WithLoading;
};

export default withLoading;
