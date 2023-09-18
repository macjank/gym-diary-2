import { RootState } from "..";
import { useSelector } from "react-redux";

const useExercisesCollection = () => {
  const exercises = useSelector(
    (state: RootState) => state.exercisesCollection.exercises
  );

  return { exercises };
};

export default useExercisesCollection;
