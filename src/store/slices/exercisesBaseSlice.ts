import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { BaseExercise, Muscle } from "../../types/apiTypes";

interface exercisesBaseSliceInterface {
  muscles: Muscle[];
  exercises: BaseExercise[];
}

const initialState: exercisesBaseSliceInterface = {
  muscles: [],
  exercises: [],
};

const exercisesBaseSlice = createSlice({
  name: "exercisesBase",
  initialState,
  reducers: {
    setMuscles(state, action: PayloadAction<{ muscles: Muscle[] }>) {
      state.muscles = action.payload.muscles;
    },
    setExercises(state, action: PayloadAction<{ exercises: BaseExercise[] }>) {
      state.exercises = action.payload.exercises;
    },
  },
});

export const { setMuscles, setExercises } = exercisesBaseSlice.actions;

export const selectBaseMuscles = (state: RootState) =>
  state.exercisesBase.muscles;
export const selectBaseExercises = (state: RootState) =>
  state.exercisesBase.exercises;

export default exercisesBaseSlice.reducer;
