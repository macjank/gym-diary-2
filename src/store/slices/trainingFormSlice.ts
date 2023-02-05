import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { v4 as uuidv4 } from "uuid";
import { Training, TrainingExercise, TrainingSet } from "../../types/apiTypes";

const initialState: Training = {
  id: uuidv4(),
  //TODO: ogarnij default date
  date: "",
  gym: "",
  exercises: [],
};

const trainingFormSlice = createSlice({
  name: "trainingForm",
  initialState,
  reducers: {
    clearForm(state) {
      state.id = uuidv4();
      state.date = "";
      state.gym = "";
      state.exercises = [];
    },
    setDate(state, action: PayloadAction<{ date: string }>) {
      const { date } = action.payload;

      state.date = date;
    },
    setGym(state, action: PayloadAction<{ gym: string }>) {
      const { gym } = action.payload;

      state.gym = gym;
    },
    addExercise(state) {
      const id = uuidv4();
      const newExercise: TrainingExercise = {
        id,
        muscleId: "",
        baseExerciseId: "",
        sets: [
          {
            id: uuidv4(),
            weight: null,
            repetitions: null,
          },
        ],
      };

      state.exercises.push(newExercise);
    },
    removeExercise(state, action: PayloadAction<{ exerciseId: string }>) {
      const { exerciseId } = action.payload;

      state.exercises = state.exercises.filter(
        (exercise) => exercise.id !== exerciseId
      );
    },
    addSet(state, action: PayloadAction<{ exerciseId: string }>) {
      const { exerciseId } = action.payload;

      const newSet: TrainingSet = {
        id: uuidv4(),
        weight: null,
        repetitions: null,
      };

      state.exercises
        .find((exercise) => exercise.id === exerciseId)
        ?.sets.push(newSet);
    },
    removeSet(
      state,
      action: PayloadAction<{ exerciseId: string; setId: string }>
    ) {
      const { exerciseId, setId } = action.payload;

      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      if (!exercise) return;

      exercise.sets = exercise?.sets.filter((set) => set.id !== setId);
    },
    selectMuscleForExercise(
      state,
      action: PayloadAction<{ exerciseId: string; muscleId: string }>
    ) {
      const { exerciseId, muscleId } = action.payload;

      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      if (exercise) {
        exercise.muscleId = muscleId;
      }
    },
    selectBaseExerciseForExercise(
      state,
      action: PayloadAction<{ exerciseId: string; baseExerciseId: string }>
    ) {
      const { exerciseId, baseExerciseId } = action.payload;

      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      if (exercise) {
        exercise.baseExerciseId = baseExerciseId;
      }
    },
    addWeightForSet(
      state,
      action: PayloadAction<{
        exerciseId: string;
        setId: string;
        weightVal: number | null;
      }>
    ) {
      const { exerciseId, setId, weightVal } = action.payload;

      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      const set = exercise?.sets.find((set) => set.id === setId);

      //TODO: co jeśli zreturnuje?
      if (!exercise || !set) {
        return;
      }

      set.weight = weightVal;
    },
    addRepsForSet(
      state,
      action: PayloadAction<{
        exerciseId: string;
        setId: string;
        repsVal: number | null;
      }>
    ) {
      const { exerciseId, setId, repsVal } = action.payload;

      const exercise = state.exercises.find(
        (exercise) => exercise.id === exerciseId
      );

      const set = exercise?.sets.find((set) => set.id === setId);

      //TODO: co jeśli zreturnuje?
      if (!exercise || !set) {
        return;
      }

      set.repetitions = repsVal;
    },
  },
});

export const {
  clearForm,
  setDate,
  setGym,
  addExercise,
  removeExercise,
  addSet,
  removeSet,
  selectMuscleForExercise,
  selectBaseExerciseForExercise,
  addWeightForSet,
  addRepsForSet,
} = trainingFormSlice.actions;

export const selectTrainingForm = (state: RootState) => state.trainingForm;
export const selectTrainingExercises = (state: RootState) =>
  state.trainingForm.exercises;
export const selectDate = (state: RootState) => state.trainingForm.date;
export const selectGym = (state: RootState) => state.trainingForm.gym;

export default trainingFormSlice.reducer;
