import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ExercisesService from '../../../services/exercises/ExercisesService';
import { IExercise } from '../../../types/exerciseTypes';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

interface useSingleExerciseProps {
  exerciseId?: string;
}

const useSingleExercise = ({ exerciseId }: useSingleExerciseProps) => {
  const { showErrorToast } = useToast();
  const { t } = useTranslation();

  const [exercise, setExercise] = useState<IExercise>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getExercise = async (id: string) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const exercise = await ExercisesService.getSingleExercise(id);
      setExercise(exercise);
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);
      setIsError(true);
      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.getDataGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!!exerciseId) {
      getExercise(exerciseId);
    }
  }, []);

  return { exercise, isLoading, isError };
};

export default useSingleExercise;
