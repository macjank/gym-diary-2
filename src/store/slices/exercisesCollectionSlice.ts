import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IExercise } from '../../types/exerciseTypes';
import { StoreNamesEnum } from '../../types/storeNamesEnum';

interface exercisesCollectionSliceInterface {
  exercises: IExercise[];
}

const initialState: exercisesCollectionSliceInterface = {
  exercises: [],
};

const exercisesCollectionSlice = createSlice({
  name: StoreNamesEnum.ExercisesCollection,
  initialState,
  reducers: {
    setExercises(state, action: PayloadAction<{ exercises: IExercise[] }>) {
      state.exercises = action.payload.exercises;
    },
  },
});

export const { setExercises } = exercisesCollectionSlice.actions;

export default exercisesCollectionSlice.reducer;
