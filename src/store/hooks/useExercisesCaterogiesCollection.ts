import { RootState } from "..";
import { useSelector } from "react-redux";

const useExercisesCollection = () => {
  const exercisesCollection = useSelector(
    (state: RootState) =>
      state.exercisesCategoriesCollection.exercisesCategories
  );

  return { exercisesCollection };
};

export default useExercisesCollection;
