import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { ITraining, ITrainingAdd } from '../../../types/trainingTypes';
import { trainingFormSchema } from '../../../utils/validationSchemas/trainingFormSchema';
import BottomActionBox from '../../bottomActionBox/BottomActionBox';
import DatePicker from '../../inputs/DatePicker';
import FormErrorMessage from '../../messages/FormErrorMessage';
import TrainingExerciseForm from './components/TrainingExerciseForm';
import { getTrainingFormDefaults } from './utils/getTrainingFormDefaults';

export type TrainingFormData = ITrainingAdd;

interface TrainingFormProps {
  onSubmitForm: (data: TrainingFormData) => void;
  isLoading: boolean;
  initialTraining?: ITraining;
}

const TrainingForm = ({ onSubmitForm, isLoading, initialTraining }: TrainingFormProps) => {
  const { t } = useTranslation();

  const methods = useForm<TrainingFormData>({
    resolver: yupResolver(trainingFormSchema),
    defaultValues: getTrainingFormDefaults({ initialTraining }),
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
      id: uuidv4(),
      exerciseId: '',
      sets: [],
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack pb="8rem" mt="1rem">
          <Stack>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
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
              <TrainingExerciseForm key={exercise.id} index={index} onRemove={() => remove(index)} />
            ))}
          </Stack>
        </Stack>
      </form>

      <BottomActionBox>
        <Stack gap={1}>
          <Button size="large" type="button" variant="outlined" color="primary" onClick={addExercise}>
            {t('trainingForm.addExerciseBtn')}
          </Button>
          <Button
            size="large"
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
