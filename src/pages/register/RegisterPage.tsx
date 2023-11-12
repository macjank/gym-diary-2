import { Link, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useRegister from '../../hooks/api/auth/useRegister';
import { routes } from '../../routes/routes';
import { ApiPasswordRegisterRequest } from '../../types/apiTypes';
import RegisterForm from './components/registerForm/RegisterForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { registerWithEmailAndPassword, isLoading } = useRegister();

  const handleSubmitRegisterForm = async ({ email, password }: ApiPasswordRegisterRequest) => {
    await registerWithEmailAndPassword({ email, password });
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
          <Link component="button" variant="body2" onClick={() => navigate(routes.login)}>
            {t('register.loginLinkBtn')}
          </Link>
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default RegisterPage;
