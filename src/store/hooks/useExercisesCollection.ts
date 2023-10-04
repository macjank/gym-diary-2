import { useSelector } from 'react-redux';
import { RootState } from '..';

const useExercisesCollection = () => {
  const exercises = useSelector((state: RootState) => state.exercisesCollection.exercises);

  return { exercises };
};

export default useExercisesCollection;
