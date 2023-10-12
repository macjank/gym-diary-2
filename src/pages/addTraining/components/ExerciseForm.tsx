import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Grid, IconButton, MenuItem, Typography } from '@mui/material';
import i18next from 'i18next';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/inputs/TextInput';
import FormErrorMessage from '../../../components/messages/FormErrorMessage';
import useExercisesCollection from '../../../store/hooks/useExercisesCollection';
import { CallbackDefault } from '../../../types/commonTypes';
import { Lang } from '../../../types/globalTypes';
import { TrainingFormData } from '../TrainingForm';
import SetForm from './SetForm';

interface ExerciseFormProps {
  index: number;
  onRemove: CallbackDefault;
}

const ExerciseForm = ({ index, onRemove }: ExerciseFormProps) => {
  const { t } = useTranslation();
  const currentLang = i18next.resolvedLanguage ?? Lang.PL;

  const { exercises } = useExercisesCollection();

  console.log(exercises);

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
    append({ repetitions: 0, weight: 0 });
  };

  return (
    <Grid mt={'2rem'}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
        <Typography variant="h6">{`${t('trainingForm.exerciseTitle')} ${index + 1}`}</Typography>
        <IconButton onClick={onRemove} size="large" edge="start" color="inherit" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      <Controller
        name={`exercises.${index}.name`}
        control={control}
        render={({ field }) => (
          <Input
            inputProps={{
              id: 'exercise-name',
              type: 'email',
              error: !!errors.exercises?.[index]?.name,
              label: t('trainingForm.exerciseNameLabel'),
              select: true,
            }}
            formFieldProps={{
              ...field,
            }}
          >
            {exercises.map(ex => (
              <MenuItem key={ex.id} value={ex.id}>
                {ex.name[currentLang]}
              </MenuItem>
            ))}
          </Input>
        )}
      />

      <FormErrorMessage errors={errors} name={`exercises.${index}.name`} />

      <FormErrorMessage errors={errors} name={`exercises.${index}.sets`} />

      {sets.map((set, setIndex) => (
        <SetForm key={set.id} exerciseIndex={index} setIndex={setIndex} removeSet={() => remove(setIndex)} />
      ))}

      <Button fullWidth sx={{ marginTop: '1rem' }} onClick={addSet}>
        {t('trainingForm.addSetBtn')}
      </Button>
    </Grid>
  );
};

export default ExerciseForm;
