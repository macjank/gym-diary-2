import { Typography } from '@mui/material';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import AuthService from '../../services/auth/AuthService';
import { ApiPasswordRegisterRequest } from '../../types/apiTypes';
import RegisterForm from './components/RegisterForm';

//TODO:
const RegisterPage = () => {
  const handleSubmitRegisterForm = async ({ email, password }: ApiPasswordRegisterRequest) => {
    await AuthService.registerWithEmailAndPassword({ email, password });
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        Rejestracja
      </Typography>
      <RegisterForm onSubmitForm={handleSubmitRegisterForm} />
    </ContentWrapper>
  );
};

export default RegisterPage;
