import { Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useToast from '../../hooks/useToast';
import { routes } from '../../routes/routes';
import AuthService from '../../services/auth/AuthService';
import { ApiPasswordRegisterRequest } from '../../types/apiTypes';
import { getApiErrorMessage } from '../../utils/handleApiError/handleApiError';
import RegisterForm from './components/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRegisterForm = async ({ email, password }: ApiPasswordRegisterRequest) => {
    try {
      setIsLoading(true);
      await AuthService.registerWithEmailAndPassword({ email, password });
      navigate(routes.login);

      showSuccessToast(t('successMessages.register'));
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.registerGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <Stack sx={{ height: '100vh', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom textAlign="center">
          {t('register.title')}
        </Typography>
        <RegisterForm onSubmitForm={handleSubmitRegisterForm} isLoading={isLoading} />

        <Stack sx={{ marginTop: '2rem' }}>
          <Typography variant="body1" sx={{ marginBottom: '1.5rem' }} gutterBottom textAlign="center">
            {t('register.haveAccount')}
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate(routes.login);
            }}
          >
            {t('register.loginLinkBtn')}
          </Link>
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default RegisterPage;
