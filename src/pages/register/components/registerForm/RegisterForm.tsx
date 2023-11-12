import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../../components/inputs/Input';
import FormErrorMessage from '../../../../components/messages/FormErrorMessage';
import { ApiPasswordRegisterRequest } from '../../../../types/apiTypes';
import { registerFormSchema } from '../../../../utils/validationSchemas/registerFormSchema';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

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
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { email, password } = data;
    await onSubmitForm({ email, password });
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

        <FormErrorMessage errors={errors} name="confirmPassword" />
      </Box>

      <Box>
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isLoading}>
          {t('register.submitBtn')}
        </Button>
      </Box>
    </Stack>
  );
};

export default RegisterForm;
