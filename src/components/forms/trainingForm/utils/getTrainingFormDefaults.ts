import { v4 as uuidv4 } from 'uuid';
import { ITraining } from '../../../../types/trainingTypes';

export const getTrainingFormDefaults = ({ initialTraining }: { initialTraining: ITraining | undefined }) => {
  const initValues = {
    date: initialTraining?.date ?? new Date(),
    exercises: initialTraining?.exercises ?? [
      {
        id: uuidv4(),
        exerciseId: '',
        sets: [
          {
            id: uuidv4(),
            repetitions: undefined,
            weight: undefined,
          },
        ],
      },
    ],
  };

  return initValues;
};
