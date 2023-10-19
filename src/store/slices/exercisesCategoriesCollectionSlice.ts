import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiBaseExerciseCategory } from '../../types/apiTypes';

interface exercisesCategoriesCollectionSliceInterface {
  exercisesCategories: ApiBaseExerciseCategory[];
}

const initialState: exercisesCategoriesCollectionSliceInterface = {
  exercisesCategories: [],
};

const exercisesCategoriesCollectionSlice = createSlice({
  name: 'exercisesCategoriesCollection',
  initialState,
  reducers: {
    setExercisesCategories(state, action: PayloadAction<{ exercisesCategories: ApiBaseExerciseCategory[] }>) {
      state.exercisesCategories = action.payload.exercisesCategories;
    },
  },
});

export const { setExercisesCategories } = exercisesCategoriesCollectionSlice.actions;

export default exercisesCategoriesCollectionSlice.reducer;
