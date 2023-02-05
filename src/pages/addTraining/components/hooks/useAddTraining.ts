import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FirebaseService from "../../../../services/firebaseService";
import { routes } from "../../../../static/routes";
import {
  addExercise,
  selectDate,
  selectGym,
  selectTrainingExercises,
  selectTrainingForm,
  setDate,
  setGym,
} from "../../../../store/slices/trainingFormSlice";
import { Training } from "../../../../types/apiTypes";

const useAddTraining = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trainingForm = useSelector(selectTrainingForm);
  const trainingExercises = useSelector(selectTrainingExercises);
  const date = useSelector(selectDate);
  const gym = useSelector(selectGym);

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    dispatch(setDate({ date: val }));
  };
  const handleChangeGym = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGym({ gym: e.currentTarget.value }));
  };

  const handleAddExercise = () => dispatch(addExercise());

  const validateTrainingForm = (trainingForm: Training) => {
    const isDateValid = !!trainingForm.date;
    const isGymValid = !!trainingForm.gym;

    const areExercisesValid = trainingForm.exercises.every(
      (exercise) =>
        !!exercise.muscleId &&
        !!exercise.baseExerciseId &&
        exercise.sets.every((set) => !!set.repetitions && !!set.weight)
    );

    const isFormValid = isDateValid && isGymValid && areExercisesValid;

    return isFormValid;
  };

  const handleSubmitTraining = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setIsSending(true);
    const isValid = validateTrainingForm(trainingForm);

    if (!isValid) {
      setErrorMessage("Invalid data");

      setIsSending(false);
      return;
    }

    FirebaseService.addTraining(trainingForm);
    setIsSending(false);
    navigate(routes.home);
  };

  const dismissErrorMessage = () => setErrorMessage("");

  return {
    date,
    handleChangeDate,
    gym,
    handleChangeGym,
    trainingExercises,
    handleAddExercise,
    handleSubmitTraining,
    errorMessage,
    dismissErrorMessage,
    isSending,
  };
};

export default useAddTraining;
