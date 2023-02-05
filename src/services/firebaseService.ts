import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import store from "../store";
import { setExercises, setMuscles } from "../store/slices/exercisesBaseSlice";
import { BaseExercise, Muscle, Training } from "../types/apiTypes";

class FirebaseService {
  static async getMuscles() {
    const querySnapshot = await getDocs(collection(db, "muscles"));

    const muscles: Muscle[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      muscles.push(data as Muscle);
    });

    store.dispatch(setMuscles({ muscles }));
  }

  static async getExercises() {
    const querySnapshot = await getDocs(collection(db, "exercises"));

    const exercises: BaseExercise[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      exercises.push(data as BaseExercise);
    });

    store.dispatch(setExercises({ exercises }));
  }

  static async addTraining(training: Training) {
    try {
      await addDoc(collection(db, "trainings"), {
        ...training,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export default FirebaseService;
