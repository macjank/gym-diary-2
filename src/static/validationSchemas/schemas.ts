import * as yup from 'yup';

export const requiredString = yup.string().required('required');

export const requiredPositiveNumber = yup
  .number()
  .transform(value => (Number.isNaN(value) ? null : value))
  .positive('positiveNumber')
  .required('required');

export const requiredArray = (message: string) => yup.array().required('required').min(1, message);

export const email = yup.string().email('invalidEmail').required('required');

export const password = yup.string().min(8, 'min8Char').required('required');

export const confirmPassword = yup
  .string()
  .required('required')
  .test('differentPasswords', 'differentPasswords', function (val) {
    return val === this.parent.password;
  });

export const trainingSet = yup.object().shape({
  id: requiredString,
  repetitions: requiredPositiveNumber,
  weight: requiredPositiveNumber,
});

export const trainingExercise = yup.object().shape({
  exerciseId: requiredString,
  sets: yup.array().of(trainingSet).required('required').min(1, 'setsRequired'),
});
