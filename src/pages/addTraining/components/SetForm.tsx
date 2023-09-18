import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useFormContext } from "react-hook-form";
import { TrainingFormData } from "../TrainingForm";

interface SetFormProps {
  exerciseIndex: number;
  setIndex: number;
  removeSet: any;
}

const SetForm = ({ exerciseIndex, setIndex, removeSet }: SetFormProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TrainingFormData>();

  return (
    <Box mt={"1rem"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Typography align="center">Set {setIndex + 1}</Typography>
        <IconButton
          onClick={removeSet}
          size="large"
          edge="start"
          color="inherit"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <InputLabel htmlFor="exercise-name">Weight (kg)</InputLabel>
          <Controller
            name={`exercises.${exerciseIndex}.sets.${setIndex}.repetitions`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                type="number"
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors?.exercises?.[exerciseIndex]?.sets?.[setIndex]
            ?.repetitions && (
            <Typography variant="caption" color="error">
              {
                errors?.exercises?.[exerciseIndex]?.sets?.[setIndex]
                  ?.repetitions?.message
              }
            </Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="exercise-name">Weight (kg)</InputLabel>
          <Controller
            name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                type="number"
                fullWidth
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors?.exercises?.[exerciseIndex]?.sets?.[setIndex]?.weight && (
            <Typography variant="caption" color="error">
              {
                errors?.exercises?.[exerciseIndex]?.sets?.[setIndex]?.weight
                  ?.message
              }
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SetForm;
