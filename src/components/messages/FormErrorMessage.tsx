import { Typography } from '@mui/material';

interface FormErrorMessageProps {
  children: React.ReactNode;
}

const FormErrorMessage = ({ children }: FormErrorMessageProps) => {
  return (
    <Typography variant="caption" color="error" display="block">
      {children}
    </Typography>
  );
};

export default FormErrorMessage;
