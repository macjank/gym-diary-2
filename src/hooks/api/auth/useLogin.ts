import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import AuthService from '../../../services/auth/AuthService';
import { ApiPasswordRegisterRequest } from '../../../types/apiTypes';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

const useLogin = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showErrorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const logInWithEmailAndPassword = async ({ email, password }: ApiPasswordRegisterRequest) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await AuthService.logInWithEmailAndPassword({ email, password });
      navigate(routes.home);
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.loginGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  const loginInWithGoogle = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      await AuthService.logInWithGoogle();
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.loginGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return { logInWithEmailAndPassword, loginInWithGoogle, isLoading, isError };
};

export default useLogin;
