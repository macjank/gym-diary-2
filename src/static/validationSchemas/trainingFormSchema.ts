import * as yup from 'yup';
import * as Schema from './schemas';

export const trainingFormSchema = yup.object().shape({
  date: yup.date().required('required'),
  exercises: Schema.requiredArray('exercises list is required').of(
    yup.object().shape({
      exerciseName: Schema.requiredString,
      sets: Schema.requiredArray('set list is required').of(
        yup.object().shape({
          repetitions: Schema.requiredPositiveNumber,
          weight: Schema.requiredPositiveNumber,
        }),
      ),
    }),
  ),
});
