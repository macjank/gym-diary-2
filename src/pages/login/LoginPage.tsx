import { Link, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useLogin from '../../hooks/api/auth/useLogin';
import { routes } from '../../routes/routes';
import { ApiPasswordLoginRequest } from '../../types/apiTypes';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { logInWithEmailAndPassword, loginInWithGoogle, isLoading } = useLogin();

  const handleSubmitLoginForm = async ({ email, password }: ApiPasswordLoginRequest) => {
    await logInWithEmailAndPassword({ email, password });
  };

  const handleGoogleLogin = async () => {
    await loginInWithGoogle();
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
