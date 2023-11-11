import { yupResolver } from '@hookform/resolvers/yup';
import { Google } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/inputs/Input';
import FormErrorMessage from '../../../../components/messages/FormErrorMessage';
import { ApiPasswordLoginRequest } from '../../../../types/apiTypes';
import { CallbackDefault } from '../../../../types/commonTypes';
import { loginFormSchema } from '../../../../utils/validationSchemas/loginFormSchema';

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
  } = useForm<ApiPasswordLoginRequest>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<ApiPasswordLoginRequest> = async ({ email, password }: ApiPasswordLoginRequest) => {
    await onPasswordLogin({ email, password });
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={{ py: 2, width: '100%', maxWidth: '600px', mx: 'auto' }}
    >
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

        <Button
          onClick={onGoogleLogin}
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          startIcon={<Google />}
        >
          {t('login.googleLogin')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
