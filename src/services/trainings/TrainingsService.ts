import { getAuth } from 'firebase/auth';
import {
  DocumentData,
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { TrainingFormData } from '../../components/forms/trainingForm/TrainingForm';
import { db } from '../../static/firebase/config';
import { FirebaseCollectionsEnum } from '../../types/firebaseCollectionsEnum';
import { ITraining } from '../../types/trainingTypes';

class TrainingsService {
  static async getUserId() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('permission-denied');
    }

    return user.uid;
  }

  static async addTraining(training: TrainingFormData) {
    const userId = await this.getUserId();

    await addDoc(collection(db, FirebaseCollectionsEnum.Trainings), {
      ...training,
      uid: userId,
      createdAt: new Date(),
    });
  }

  static async getTrainings({ queryLimit }: { queryLimit?: number } = {}) {
    const userId = await this.getUserId();

    let myQuery: Query<DocumentData> = query(
      collection(db, FirebaseCollectionsEnum.Trainings),
      where('uid', '==', userId),
    );

    if (queryLimit) {
      myQuery = query(myQuery, limit(queryLimit));
    }

    const querySnapshot = await getDocs(myQuery);

    const trainings: ITraining[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();

      trainings.push({
        ...data,
        date: data.date.toDate(),
        createdAt: data.createdAt.toDate(),
        id: doc.id,
      } as ITraining);
    });

    return trainings;
  }

  static async getSingleTraining(id: string) {
    const docRef = doc(db, FirebaseCollectionsEnum.Trainings, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const trainingResponse = docSnap.data();

      const training = {
        ...trainingResponse,
        id: docSnap.id,
        date: trainingResponse.date.toDate(),
        createdAt: trainingResponse.createdAt.toDate(),
      };

      return training as ITraining;
    } else {
      throw new Error('noSuchDocument');
    }
  }

  static async editTraining({ id, trainingData }: { id: string; trainingData: TrainingFormData }) {
    const docRef = doc(db, FirebaseCollectionsEnum.Trainings, id);

    await updateDoc(docRef, {
      ...trainingData,
    });
  }

  static async deleteTraining(id: string) {
    await deleteDoc(doc(db, FirebaseCollectionsEnum.Trainings, id));
  }
}

export default TrainingsService;
