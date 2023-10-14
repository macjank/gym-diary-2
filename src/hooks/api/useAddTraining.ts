import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrainingsService from '../../services/trainings/TrainingsService';
import { ApiAddTrainingRequest } from '../../types/apiTypes';
import { getApiErrorMessage } from '../../utils/handleApiError/handleApiError';
import useToast from '../useToast';

const useAddTraining = () => {
  const { t } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const addTraining = async (data: ApiAddTrainingRequest) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await TrainingsService.addTraining(data);

      showSuccessToast(t('successMessages.newTrainingAdded'));
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.addTrainingGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return { addTraining, isLoading, isError };
};

export default useAddTraining;
