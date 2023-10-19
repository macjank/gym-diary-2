import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiBaseExercise } from '../../types/apiTypes';

interface exercisesCollectionSliceInterface {
  exercises: ApiBaseExercise[];
}

const initialState: exercisesCollectionSliceInterface = {
  exercises: [],
};

const exercisesCollectionSlice = createSlice({
  name: 'exercisesCollection',
  initialState,
  reducers: {
    setExercises(state, action: PayloadAction<{ exercises: ApiBaseExercise[] }>) {
      state.exercises = action.payload.exercises;
    },
  },
});

export const { setExercises } = exercisesCollectionSlice.actions;

export default exercisesCollectionSlice.reducer;
