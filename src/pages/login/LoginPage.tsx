import { Link, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useToast from '../../hooks/useToast';
import { routes } from '../../routes/routes';
import AuthService from '../../services/auth/AuthService';
import { ApiPasswordLoginRequest } from '../../types/apiTypes';
import { getApiErrorMessage } from '../../utils/handleApiError/handleApiError';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitLoginForm = async ({ email, password }: ApiPasswordLoginRequest) => {
    try {
      setIsLoading(true);
      await AuthService.logInWithEmailAndPassword({ email, password });
      navigate(routes.home);
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.loginGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await AuthService.logInWithGoogle();
      setIsLoading(false);

      navigate(routes.home);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <Stack sx={{ height: '100vh', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom textAlign="center">
          {t('login.title')}
        </Typography>
        <LoginForm onPasswordLogin={handleSubmitLoginForm} onGoogleLogin={handleGoogleLogin} isLoading={isLoading} />

        <Stack sx={{ marginTop: '2rem' }}>
          <Typography variant="body1" sx={{ marginBottom: '1.5rem' }} gutterBottom textAlign="center">
            {t('login.noAccount')}
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              navigate(routes.register);
            }}
          >
            {t('login.registerLinkBtn')}
          </Link>
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default LoginPage;
