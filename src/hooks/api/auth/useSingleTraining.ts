import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrainingsService from '../../../services/trainings/TrainingsService';
import { ITraining } from '../../../types/trainingTypes';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

interface useSingleTrainingProps {
  trainingId?: string;
}

const useSingleTraining = ({ trainingId }: useSingleTrainingProps) => {
  const { showErrorToast } = useToast();
  const { t } = useTranslation();

  const [training, setTraining] = useState<ITraining>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getTraining = async (id: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const training = await TrainingsService.getSingleTraining(id);
      setTraining(training);
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      setIsError(true);
      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.getDataGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!!trainingId) {
      getTraining(trainingId);
    }
  }, []);

  return { training, isLoading, isError };
};

export default useSingleTraining;
