import { v4 as uuidv4 } from 'uuid';
import { ITraining } from '../../../../types/trainingTypes';
import { TrainingFormData } from '../TrainingForm';

export const getTrainingFormDefaults = ({ initialTraining }: { initialTraining: ITraining | undefined }) => {
  const initValues: TrainingFormData = {
    date: initialTraining?.date ?? new Date(),
    exercises: initialTraining?.exercises ?? [
      {
        id: uuidv4(),
        exerciseId: '',
        sets: [
          {
            id: uuidv4(),
            repetitions: 0,
            weight: 0,
          },
        ],
      },
    ],
  };

  return initValues;
};
