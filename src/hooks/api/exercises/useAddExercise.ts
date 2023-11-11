import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExerciseFormData } from '../../../components/forms/exerciseForm/ExerciseForm';
import ExercisesService from '../../../services/exercises/ExercisesService';
import store from '../../../store';
import { setExercises } from '../../../store/slices/exercisesCollectionSlice';
import { getApiErrorMessage } from '../../../utils/handleApiError/handleApiError';
import useToast from '../../useToast';

const useAddExercise = () => {
  const { t } = useTranslation();
  const { showErrorToast, showSuccessToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const addExercise = async (data: ExerciseFormData) => {
    setIsLoading(true);
    setIsError(false);

    try {
      await ExercisesService.addExercise(data);

      showSuccessToast(t('successMessages.newExerciseAdded'));

      const exercises = await ExercisesService.getExercises();
      store.dispatch(setExercises({ exercises }));
    } catch (error) {
      const errorMsg = getApiErrorMessage(error);

      setIsError(true);

      showErrorToast(t(!!errorMsg ? `errorMessages.api.${errorMsg}` : 'errorMessages.api.addExerciseGeneral'));
    } finally {
      setIsLoading(false);
    }
  };

  return { addExercise, isLoading, isError };
};

export default useAddExercise;
