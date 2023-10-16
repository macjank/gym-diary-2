import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../firebase/config';
import { ApiPasswordLoginRequest, ApiPasswordRegisterRequest } from '../../types/apiTypes';

const auth = getAuth();

class AuthService {
  static async logInWithEmailAndPassword({ email, password }: ApiPasswordLoginRequest) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  static async registerWithEmailAndPassword({ email, password }: ApiPasswordRegisterRequest) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  }

  static async logout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  static async logInWithGoogle() {
    await signInWithPopup(auth, googleProvider);
  }
}

export default AuthService;
