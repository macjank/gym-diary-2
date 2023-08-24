import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../../components/wrappers/ContentWrapper";
import {
  selectBaseExercises,
  selectBaseMuscles,
} from "../../store/slices/exercisesBaseSlice";

const ExercisesBase = () => {
  const baseExercises = useSelector(selectBaseExercises);
  const baseMuscles = useSelector(selectBaseMuscles);

  const getExercisesByMuscleId = (muscleId: string) => {
    return baseExercises.filter((exercise) => exercise.muscleId === muscleId);
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: "1.5rem" }} gutterBottom>
        Exercises base
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ marginBottom: "1.5rem" }}
        gutterBottom
      >
        All exercises are divided into groups by muscle name. You cannot delete
        muscle or exercise once you add it!
      </Typography>
      <Box>
        {baseMuscles.map((muscle) => (
          <Box mb="2rem">
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textTransform: "capitalize" }}
            >
              {muscle.name}
            </Typography>

            {getExercisesByMuscleId(muscle.id).map((exercise) => (
              <Typography variant="subtitle1" gutterBottom>
                {exercise.name}
              </Typography>
            ))}

            <TextField type="text" label="New exercise" />
          </Box>
        ))}
      </Box>
    </ContentWrapper>
  );
};

export default ExercisesBase;
