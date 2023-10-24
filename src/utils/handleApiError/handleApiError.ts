import { FirebaseError } from 'firebase/app';

export const getApiErrorMessage = (err: unknown) => {
  if (err instanceof FirebaseError) {
    return err.code;
  } else if (err instanceof Error) {
    return err.message;
  }
};
