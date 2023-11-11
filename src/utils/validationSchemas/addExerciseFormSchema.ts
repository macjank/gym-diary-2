import * as yup from 'yup';
import * as Schema from './schemas';

export const addExerciseFormSchema = yup.object().shape({
  namePl: Schema.requiredString,
  nameEn: Schema.requiredString,
});
