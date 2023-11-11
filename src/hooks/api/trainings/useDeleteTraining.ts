import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrainingsService from '../../../services/trainings/TrainingsService';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

const useDeleteTraining = () => {
  const { t } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteTraining = async (id: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await TrainingsService.deleteTraining(id);

      showSuccessToast(t('successMessages.trainingDeleted'));
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.deleteTrainingGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTraining, isLoading, isError };
};

export default useDeleteTraining;
