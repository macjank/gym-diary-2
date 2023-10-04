import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
}

export default AuthService;
