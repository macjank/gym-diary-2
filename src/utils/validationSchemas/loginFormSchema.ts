import * as yup from 'yup';
import * as Schema from './schemas';

export const loginFormSchema = yup.object().shape({
  email: Schema.email,
  password: Schema.password,
});
