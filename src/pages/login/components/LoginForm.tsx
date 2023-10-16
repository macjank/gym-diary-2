import { yupResolver } from '@hookform/resolvers/yup';
import { Google } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/inputs/TextInput';
import FormErrorMessage from '../../../components/messages/FormErrorMessage';
import { loginFormSchema } from '../../../static/validationSchemas/loginFormSchema';
import { ApiPasswordLoginRequest } from '../../../types/apiTypes';
import { CallbackDefault } from '../../../types/commonTypes';

interface LoginFormProps {
  onPasswordLogin: ({ email, password }: ApiPasswordLoginRequest) => Promise<void>;
  onGoogleLogin: CallbackDefault;
  isLoading: boolean;
}
const LoginForm = ({ onPasswordLogin, onGoogleLogin, isLoading }: LoginFormProps) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = async ({ email, password }: ApiPasswordLoginRequest) => {
    await onPasswordLogin({ email, password });
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
          <FormErrorMessage errors={errors} name="email" />
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
          <FormErrorMessage errors={errors} name="password" />
        </Box>

        <Stack gap={1}>
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isLoading}>
            {t('login.submitBtn')}
          </Button>

          <Button onClick={onGoogleLogin} variant="outlined" color="primary" fullWidth startIcon={<Google />}>
            {t('login.googleLogin')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
