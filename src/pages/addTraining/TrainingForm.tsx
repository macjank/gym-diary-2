import { Button, Stack, Typography } from '@mui/material';
import ContentWrapper from '../../components/wrappers/ContentWrapper';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import BottomActionBox from '../../components/bottomActionBox/BottomActionBox';
import CustomDatePicker from '../../components/inputs/CustomDatePicker';
import FormErrorMessage from '../../components/messages/FormErrorMessage';
import { trainingFormSchema } from '../../static/validationSchemas/trainingFormSchema';
import ExerciseForm from './components/ExerciseForm';

export interface TrainingFormData {
  date: Date;
  exercises: {
    name: string;
    sets: {
      repetitions: number;
      weight: number;
    }[];
  }[];
}

const TrainingForm = () => {
  const { t } = useTranslation();

  const methods = useForm<TrainingFormData>({
    resolver: yupResolver(trainingFormSchema),
    defaultValues: {
      date: new Date(),
      exercises: [
        {
          name: '',
          sets: [
            {
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

  //TODO:
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => console.log(data);

  const addExercise = () => {
    append({
      name: '',
      sets: [],
    });
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('addTraining.title')}
      </Typography>

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
      </FormProvider>

      <BottomActionBox>
        <Stack gap={1}>
          <Button type="button" variant="outlined" color="primary" onClick={addExercise}>
            {t('trainingForm.addExerciseBtn')}
          </Button>
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
            {t('trainingForm.submitFormBtn')}
          </Button>
        </Stack>
      </BottomActionBox>
    </ContentWrapper>
  );
};

export default TrainingForm;
