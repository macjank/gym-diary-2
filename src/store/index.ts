import { configureStore } from "@reduxjs/toolkit";
import exercisesCollectionSlice from "./slices/exercisesCollectionSlice";
import exercisesCategoriesCollectionSlice from "./slices/exercisesCategoriesCollectionSlice";

const store = configureStore({
  reducer: {
    exercisesCollection: exercisesCollectionSlice,
    exercisesCategoriesCollection: exercisesCategoriesCollectionSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
