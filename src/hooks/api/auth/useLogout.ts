import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthService from '../../../services/auth/AuthService';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

const useLogout = () => {
  const { t } = useTranslation();
  const { showErrorToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      await AuthService.logout();
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.logoutGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading, isError };
};

export default useLogout;
