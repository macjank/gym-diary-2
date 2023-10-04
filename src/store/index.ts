import { configureStore } from '@reduxjs/toolkit';
import exercisesCategoriesCollectionSlice from './slices/exercisesCategoriesCollectionSlice';
import exercisesCollectionSlice from './slices/exercisesCollectionSlice';

const store = configureStore({
  reducer: {
    exercisesCollection: exercisesCollectionSlice,
    exercisesCategoriesCollection: exercisesCategoriesCollectionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
