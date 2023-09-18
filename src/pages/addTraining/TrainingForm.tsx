import { Button, Grid, Input, InputLabel, Typography } from "@mui/material";
import ContentWrapper from "../../components/wrappers/ContentWrapper";
import { yupResolver } from "@hookform/resolvers/yup";

import ExerciseForm from "./components/ExerciseForm";
import {
  useForm,
  Controller,
  useFieldArray,
  FormProvider,
} from "react-hook-form";
import { trainingFormSchema } from "../../static/validationSchemas/trainingFormSchema";
import { useEffect } from "react";

export interface TrainingFormData {
  exercises: {
    exerciseName: string;
    sets: {
      repetitions: number | null;
      weight: number | null;
    }[];
  }[];
}

const TrainingForm = () => {
  const methods = useForm({
    resolver: yupResolver(trainingFormSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const onSubmit = (data: any) => console.log(data);

  const addExercise = () => {
    append({ exerciseName: "", sets: [] });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: "1.5rem" }} gutterBottom>
        New training
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="date">Date</InputLabel>
              <Controller
                name="date"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <Input
                    id="date"
                    type="date"
                    {...field}
                    error={!!errors.date}
                  />
                )}
              />
              {errors["date"] && (
                <Typography variant="caption" color="error">
                  {errors["date"].message}
                </Typography>
              )}
            </Grid>

            {!!errors.exercises && (
              <Typography variant="caption" color="error">
                {errors.exercises.message || errors.exercises?.root?.message}
              </Typography>
            )}

            <Grid item xs={12}>
              {fields.map((exercise, index) => (
                <ExerciseForm
                  key={exercise.id}
                  index={index}
                  onRemove={() => remove(index)}
                />
              ))}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>

              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={addExercise}
              >
                Dodaj ćwiczenie
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </ContentWrapper>
  );
};

export default TrainingForm;
