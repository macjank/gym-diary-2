import { useSelector } from 'react-redux';
import { RootState } from '..';

const useExercisesCollection = () => {
  const exercisesCollection = useSelector(
    (state: RootState) => state.exercisesCategoriesCollection.exercisesCategories,
  );

  return { exercisesCollection };
};

export default useExercisesCollection;
