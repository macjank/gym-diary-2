import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiExercise } from '../../types/apiTypes';

interface exercisesCollectionSliceInterface {
  exercises: ApiExercise[];
}

const initialState: exercisesCollectionSliceInterface = {
  exercises: [],
};

const exercisesCollectionSlice = createSlice({
  name: 'exercisesCollection',
  initialState,
  reducers: {
    setExercises(state, action: PayloadAction<{ exercises: ApiExercise[] }>) {
      state.exercises = action.payload.exercises;
    },
  },
});

export const { setExercises } = exercisesCollectionSlice.actions;

export default exercisesCollectionSlice.reducer;
