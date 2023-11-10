import { ApiBaseExercise } from '../../../../../types/apiTypes';

export const findExerciseName = ({
  exerciseId,
  exercisesCollection,
}: {
  exerciseId: string;
  exercisesCollection: ApiBaseExercise[];
}) => {
  return exercisesCollection.find(exercise => exercise.id === exerciseId)?.name;
};
