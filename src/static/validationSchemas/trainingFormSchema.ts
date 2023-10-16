import * as yup from 'yup';
import * as Schema from './schemas';

export const trainingFormSchema = yup.object().shape({
  date: yup.date().required('required'),
  exercises: yup.array().of(Schema.trainingExercise).required('required').min(1, 'exercisesRequired'),
});
