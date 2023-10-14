import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import BottomActionBox from '../../components/bottomActionBox/BottomActionBox';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import FormErrorMessage from '../../components/messages/FormErrorMessage';
import { trainingFormSchema } from '../../static/validationSchemas/trainingFormSchema';
import { TrainingSet } from '../../types/trainingTypes';
import ExerciseForm from './components/ExerciseForm';

export interface TrainingFormData {
  date: Date;
  exercises: {
    exerciseId: string;
    sets: TrainingSet[];
  }[];
}

interface TrainingFormProps {
  onSubmitForm: (data: TrainingFormData) => void;
  isLoading: boolean;
}

const TrainingForm = ({ onSubmitForm, isLoading }: TrainingFormProps) => {
  const { t } = useTranslation();

  const methods = useForm<TrainingFormData>({
    resolver: yupResolver(trainingFormSchema),
    defaultValues: {
      date: new Date(),
      exercises: [
        {
          exerciseId: '',
          sets: [
            {
              id: uuidv4(),
              repetitions: 0,
              weight: 0,
            },
          ],
        },
      ],
    },
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

  const onSubmit = (data: TrainingFormData) => onSubmitForm(data);

  const addExercise = () => {
    append({
      exerciseId: '',
      sets: [],
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack pb="6rem">
          <Stack>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <CustomDatePicker
                  label={t('trainingForm.dateLabel')}
                  value={field.value}
                  setValue={val => field.onChange(val)}
                />
              )}
            />
            <FormErrorMessage errors={errors} name="date" />
          </Stack>

          <FormErrorMessage errors={errors} name="exercises" />

          <Stack>
            {fields.map((exercise, index) => (
              <ExerciseForm key={exercise.id} index={index} onRemove={() => remove(index)} />
            ))}
          </Stack>
        </Stack>
      </form>

      <BottomActionBox>
        <Stack gap={1}>
          <Button type="button" variant="outlined" color="primary" onClick={addExercise}>
            {t('trainingForm.addExerciseBtn')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {t('trainingForm.submitFormBtn')}
          </Button>
        </Stack>
      </BottomActionBox>
    </FormProvider>
  );
};

export default TrainingForm;
