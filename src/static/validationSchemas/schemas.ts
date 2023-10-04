import * as yup from 'yup';

export const requiredString = yup.string().required('required');

export const requiredPositiveNumber = yup
  .number()
  .transform(value => (Number.isNaN(value) ? null : value))
  .positive('required')
  .required('required');

export const requiredArray = (message: string) => yup.array().required('required').min(1, message);

export const email = yup.string().email('invalidEmail').required('required');

export const password = yup.string().min(8, 'min8Char').required('required');
