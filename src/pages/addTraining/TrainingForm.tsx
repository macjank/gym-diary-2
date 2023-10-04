import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@mui/material';
import ContentWrapper from '../../components/wrappers/ContentWrapper';

import { DatePicker } from '@mui/x-date-pickers';
import { useEffect } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { trainingFormSchema } from '../../static/validationSchemas/trainingFormSchema';
import ExerciseForm from './components/ExerciseForm';

export interface TrainingFormData {
  exercises: {
    exerciseName: string;
    sets: {
      repetitions: number | null;
      weight: number | null;
    }[];
  }[];
}

//TODO:
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
    name: 'exercises',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => console.log(data);

  const addExercise = () => {
    append({ exerciseName: '', sets: [] });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        New training
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="date"
                control={control}
                //TODO: dodać do walidacji yupowej
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <DatePicker label="Date" {...field} />
                  // <Input
                  //   id="date"
                  //   type="date"
                  //   {...field}
                  //   error={!!errors.date}
                  // />
                )}
              />
              {errors['date'] && (
                <Typography variant="caption" color="error">
                  {errors['date'].message}
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
                <ExerciseForm key={exercise.id} index={index} onRemove={() => remove(index)} />
              ))}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>

              <Button type="button" variant="contained" color="primary" onClick={addExercise}>
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
