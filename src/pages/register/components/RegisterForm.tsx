import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/inputs/TextInput';
import FormErrorMessage from '../../../components/messages/FormErrorMessage';
import { registerFormSchema } from '../../../static/validationSchemas/registerFormSchema';
import { ApiPasswordRegisterRequest } from '../../../types/apiTypes';

interface RegisterFormProps {
  onSubmitForm: ({ email, password }: ApiPasswordRegisterRequest) => Promise<void>;
  isLoading: boolean;
}
const RegisterForm = ({ onSubmitForm, isLoading }: RegisterFormProps) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async ({ email, password }: ApiPasswordRegisterRequest) => {
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
                  id: 'register-email',
                  type: 'email',
                  error: !!errors.email,
                  label: t('register.emailLabel'),
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
                  id: 'register-password',
                  type: 'password',
                  error: !!errors.password,
                  label: t('register.passwordLabel'),
                }}
                formFieldProps={{
                  ...field,
                }}
              />
            )}
          />
          <FormErrorMessage errors={errors} name="password" />
        </Box>

        <Box>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  id: 'register-confirm-password',
                  type: 'password',
                  error: !!errors.confirmPassword,
                  label: t('register.confirmPasswordLabel'),
                }}
                formFieldProps={{
                  ...field,
                }}
              />
            )}
          />
          {/* {!!errors.confirmPassword && (
            <FormErrorMessage>{t(`errorMessages.form.${errors.confirmPassword.message}`)}</FormErrorMessage>
          )} */}
          <FormErrorMessage errors={errors} name="confirmPassword" />
        </Box>

        <Box>
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isLoading}>
            {t('register.submitBtn')}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
