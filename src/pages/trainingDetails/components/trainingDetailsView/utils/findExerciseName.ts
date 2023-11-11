import { IExercise } from '../../../../../types/exerciseTypes';

export const findExerciseName = ({
  exerciseId,
  exercisesCollection,
}: {
  exerciseId: string;
  exercisesCollection: IExercise[];
}) => {
  return exercisesCollection.find(exercise => exercise.id === exerciseId)?.name;
};
