import { useSelector } from 'react-redux';
import { RootState } from '..';

const useExercisesCategoriesCollection = () => {
  const exercisesCollection = useSelector(
    (state: RootState) => state.exercisesCategoriesCollection.exercisesCategories,
  );

  return { exercisesCollection };
};

export default useExercisesCategoriesCollection;
