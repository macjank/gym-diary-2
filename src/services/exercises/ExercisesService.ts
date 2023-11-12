import { getAuth } from 'firebase/auth';
import {
  DocumentData,
  Query,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ExerciseFormData } from '../../components/forms/exerciseForm/ExerciseForm';
import { db } from '../../static/firebase/config';
import { ApiBaseExerciseCategory, IExercise } from '../../types/exerciseTypes';
import { FirebaseCollectionsEnum } from '../../types/firebaseCollectionsEnum';

class ExercisesService {
  static async getUserId() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('permission-denied');
    }

    return user.uid;
  }

  static async getExercisesCategories() {
    const querySnapshot = await getDocs(collection(db, FirebaseCollectionsEnum.ExercisesCategories));

    const categories: ApiBaseExerciseCategory[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      categories.push(data as ApiBaseExerciseCategory);
    });

    return categories;
  }

  static async getExercises() {
    const userId = await this.getUserId();

    const myQuery: Query<DocumentData> = query(
      collection(db, FirebaseCollectionsEnum.Exercises),
      where('uid', '==', userId),
    );

    const querySnapshot = await getDocs(myQuery);

    const exercises: IExercise[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      exercises.push({ ...data, id: doc.id, createdAt: data.createdAt.toDate() } as IExercise);
    });

    return exercises;
  }

  static async addExercise(exercise: ExerciseFormData) {
    const userId = await this.getUserId();

    await addDoc(collection(db, FirebaseCollectionsEnum.Exercises), {
      ...exercise,
      uid: userId,
      createdAt: new Date(),
    });
  }

  static async getSingleExercise(id: string) {
    const docRef = doc(db, FirebaseCollectionsEnum.Exercises, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const exerciseResponse = docSnap.data();

      const exercise = {
        ...exerciseResponse,
        id: docSnap.id,
        createdAt: exerciseResponse.createdAt.toDate(),
      };

      return exercise as IExercise;
    } else {
      throw new Error('noSuchDocument');
    }
  }

  static async editExercise({ id, exerciseData }: { id: string; exerciseData: ExerciseFormData }) {
    const docRef = doc(db, FirebaseCollectionsEnum.Exercises, id);

    await updateDoc(docRef, {
      ...exerciseData,
    });
  }
}

export default ExercisesService;
