import { configureStore } from "@reduxjs/toolkit";
import exercisesBaseSlice from "./slices/exercisesBaseSlice";
import trainingFormSlice from "./slices/trainingFormSlice";

const store = configureStore({
  reducer: {
    exercisesBase: exercisesBaseSlice,
    trainingForm: trainingFormSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
