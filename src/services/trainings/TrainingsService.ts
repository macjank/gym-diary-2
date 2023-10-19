import { DocumentData, Query, addDoc, collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../firebase/config';
import store from '../../store';
import { setExercisesCategories } from '../../store/slices/exercisesCategoriesCollectionSlice';
import { setExercises } from '../../store/slices/exercisesCollectionSlice';
import { ApiAddTrainingRequest, ApiBaseExercise, ApiBaseExerciseCategory } from '../../types/apiTypes';
import { FirebaseCollectionsEnum } from '../../types/firebaseCollectionsEnum';
import { ITraining } from '../../types/trainingTypes';

class TrainingsService {
  static async getExercisesCategories() {
    const querySnapshot = await getDocs(collection(db, FirebaseCollectionsEnum.ExercisesCategories));

    const categories: ApiBaseExerciseCategory[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      categories.push(data as ApiBaseExerciseCategory);
    });

    store.dispatch(setExercisesCategories({ exercisesCategories: categories }));
  }

  static async getExercises() {
    const querySnapshot = await getDocs(collection(db, FirebaseCollectionsEnum.Exercises));

    const exercises: ApiBaseExercise[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      exercises.push(data as ApiBaseExercise);
    });

    store.dispatch(setExercises({ exercises }));
  }

  static async addTraining(training: ApiAddTrainingRequest) {
    await addDoc(collection(db, FirebaseCollectionsEnum.Trainings), {
      ...training,
    });
  }
}

export default TrainingsService;
