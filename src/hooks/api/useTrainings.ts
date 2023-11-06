import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TrainingsService from '../../services/trainings/TrainingsService';
import { ITraining } from '../../types/trainingTypes';
import { getApiErrorMessage } from '../../utils/handleApiError/handleApiError';
import useToast from '../useToast';

interface useTrainingsProps {
  limit?: number;
}

const useTrainings = ({ limit }: useTrainingsProps = {}) => {
  const { t } = useTranslation();
  const { showErrorToast } = useToast();

  const [trainings, setTrainings] = useState<ITraining[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTrainings = async () => {
    setIsLoading(true);

    try {
      const trainings = await TrainingsService.getTrainings({ queryLimit: limit });

      setTrainings(trainings);
    } catch (error) {
      setIsError(true);
      const errorMsg = getApiErrorMessage(error);
      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.getDataGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrainings();
  }, []);

  return { trainings, isLoading, isError };
};

export default useTrainings;
