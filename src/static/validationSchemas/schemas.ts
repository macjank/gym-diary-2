import * as yup from "yup";

export const requiredString = yup.string().required("required");

export const requiredPositiveNumber = yup
  .number()
  .transform((value) => (Number.isNaN(value) ? null : value))
  .positive("must be positive")
  .required("required");

export const requiredArray = (message: string) =>
  yup.array().required("required").min(1, message);
