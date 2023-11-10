import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrainingsService from '../../../services/trainings/TrainingsService';
import { ITrainingAdd } from '../../../types/trainingTypes';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

const useEditTraining = () => {
  const { t } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const editTraining = async ({ id, trainingData }: { id: string; trainingData: ITrainingAdd }) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await TrainingsService.editTraining({ id, trainingData });

      showSuccessToast(t('successMessages.trainingEdited'));
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.editTrainingGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return { editTraining, isLoading, isError };
};

export default useEditTraining;
