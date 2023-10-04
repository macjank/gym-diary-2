import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/inputs/TextInput';
import FormErrorMessage from '../../../components/messages/FormErrorMessage';
import { loginFormSchema } from '../../../static/validationSchemas/loginFormSchema';
import { ApiPasswordLoginRequest } from '../../../types/apiTypes';

interface LoginFormProps {
  onSubmitForm: ({ email, password }: ApiPasswordLoginRequest) => Promise<void>;
  isLoading: boolean;
}
const LoginForm = ({ onSubmitForm, isLoading }: LoginFormProps) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async ({ email, password }: ApiPasswordLoginRequest) => {
    await onSubmitForm({ email, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <Stack spacing={2} sx={{ p: 2, maxWidth: '600px', mx: 'auto' }}>
        <Box>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  id: 'login-email',
                  type: 'email',
                  error: !!errors.email,
                  label: t('login.emailLabel'),
                }}
                formFieldProps={{
                  ...field,
                }}
              />
            )}
          />
          {!!errors.email && <FormErrorMessage>{t(`errorMessages.form.${errors.email.message}`)}</FormErrorMessage>}
        </Box>

        <Box>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  id: 'login-password',
                  type: 'password',
                  error: !!errors.password,
                  label: t('login.passwordLabel'),
                }}
                formFieldProps={{
                  ...field,
                }}
              />
            )}
          />
          {!!errors.password && (
            <FormErrorMessage>{t(`errorMessages.form.${errors.password.message}`)}</FormErrorMessage>
          )}
        </Box>

        <Box>
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isLoading}>
            {t('login.submitBtn')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginForm;
