import { Box, Button, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import useExercisesCollection from '../../../store/hooks/useExercisesCollection';
import { CallbackDefault } from '../../../types/commonTypes';
import { TrainingFormData } from '../TrainingForm';
import SetForm from './SetForm';

interface ExerciseFormProps {
  index: number;
  onRemove: CallbackDefault;
}

//TODO:
const ExerciseForm = ({ index, onRemove }: ExerciseFormProps) => {
  const { exercises } = useExercisesCollection();

  const {
    control,
    formState: { errors },
  } = useFormContext<TrainingFormData>();
  const {
    fields: sets,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  const addSet = () => {
    append({ repetitions: null, weight: null });
  };

  return (
    <Grid mt={'2rem'}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography variant="h6">Exercise</Typography>
        <IconButton onClick={onRemove} size="large" edge="start" color="inherit" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <InputLabel htmlFor="exercise-name">Exercise name</InputLabel>
      <Controller
        name={`exercises.${index}.exerciseName`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            id="exercise-name"
            sx={{ width: '100%' }}
            value={value}
            onChange={onChange}
            error={!!errors?.exercises?.[index]?.exerciseName}
          >
            {exercises.map(ex => (
              <MenuItem key={ex.id} value={ex.id}>
                {ex.name['pl']}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      {errors?.exercises?.[index]?.exerciseName && (
        <Typography variant="caption" color="error">
          {errors?.exercises?.[index]?.exerciseName?.message}
        </Typography>
      )}

      {!!errors.exercises?.[index]?.sets && (
        <Typography variant="caption" color="error">
          {errors.exercises?.[index]?.sets?.message}
        </Typography>
      )}

      {sets.map((set, setIndex) => (
        <SetForm key={set.id} exerciseIndex={index} setIndex={setIndex} removeSet={() => remove(setIndex)} />
      ))}

      <Button sx={{ marginTop: '1rem', width: '100%' }} onClick={addSet}>
        Add set
      </Button>
    </Grid>
  );
};

export default ExerciseForm;
