import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import store from '../store';
import { setExercisesCategories } from '../store/slices/exercisesCategoriesCollectionSlice';
import { setExercises } from '../store/slices/exercisesCollectionSlice';
import { ApiExercise, ApiExerciseCategory } from '../types/apiTypes';
import { FirebaseCollectionsEnum } from '../types/firebaseCollectionsEnum';
import { Training } from '../types/trainingTypes';

//TODO: rename
class FirebaseService {
  static async getExercisesCategories() {
    const querySnapshot = await getDocs(collection(db, FirebaseCollectionsEnum.ExercisesCategories));

    const categories: ApiExerciseCategory[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      categories.push(data as ApiExerciseCategory);
    });

    store.dispatch(setExercisesCategories({ exercisesCategories: categories }));
  }

  static async getExercises() {
    const querySnapshot = await getDocs(collection(db, FirebaseCollectionsEnum.Exercises));

    const exercises: ApiExercise[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      exercises.push(data as ApiExercise);
    });

    store.dispatch(setExercises({ exercises }));
  }

  static async addTraining(training: Training) {
    try {
      await addDoc(collection(db, FirebaseCollectionsEnum.Trainings), {
        ...training,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}

export default FirebaseService;
