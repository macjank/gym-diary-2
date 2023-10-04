import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiExerciseCategory } from '../../types/apiTypes';

interface exercisesCategoriesCollectionSliceInterface {
  exercisesCategories: ApiExerciseCategory[];
}

const initialState: exercisesCategoriesCollectionSliceInterface = {
  exercisesCategories: [],
};

const exercisesCategoriesCollectionSlice = createSlice({
  name: 'exercisesCategoriesCollection',
  initialState,
  reducers: {
    setExercisesCategories(state, action: PayloadAction<{ exercisesCategories: ApiExerciseCategory[] }>) {
      state.exercisesCategories = action.payload.exercisesCategories;
    },
  },
});

export const { setExercisesCategories } = exercisesCategoriesCollectionSlice.actions;

export default exercisesCategoriesCollectionSlice.reducer;
