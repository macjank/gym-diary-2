import * as yup from 'yup';
import * as Schema from './schemas';

export const registerFormSchema = yup.object().shape({
  email: Schema.email,
  password: Schema.password,
});
