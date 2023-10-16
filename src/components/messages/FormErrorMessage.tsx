import { ErrorMessage, FieldValuesFromFieldErrors } from '@hookform/error-message';
import { Box, Typography } from '@mui/material';
import { DeepRequired, FieldErrors, FieldErrorsImpl, FieldName, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormErrorMessageProps {
  errors: FieldErrors;
  name: string;
}

const FormErrorMessage = <T extends FieldValues>({ errors, name }: FormErrorMessageProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <ErrorMessage
        errors={errors}
        name={name as FieldName<FieldValuesFromFieldErrors<Partial<FieldErrorsImpl<DeepRequired<T>>>>>}
        render={({ message }) => {
          if (!!message) {
            return (
              <Typography variant="caption" color="error">
                {t(`errorMessages.form.${message}`)}
              </Typography>
            );
          }
        }}
      />
    </Box>
  );
};

export default FormErrorMessage;
