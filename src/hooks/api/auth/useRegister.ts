import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import AuthService from '../../../services/auth/AuthService';
import { ApiPasswordRegisterRequest } from '../../../types/apiTypes';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

const useRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const registerWithEmailAndPassword = async ({ email, password }: ApiPasswordRegisterRequest) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await AuthService.registerWithEmailAndPassword({ email, password });
      showSuccessToast(t('successMessages.register'));
      navigate(routes.login);
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.registerGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return { registerWithEmailAndPassword, isLoading, isError };
};

export default useRegister;
