import * as yup from 'yup';
import * as Schema from './schemas';

export const addExerciseFormSchema = yup.object().shape({
  name: yup.array(Schema.multilangString).required('required'),
});
