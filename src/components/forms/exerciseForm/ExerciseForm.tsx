import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MultilangString } from '../../../types/globalTypes';
import { addExerciseFormSchema } from '../../../utils/validationSchemas/addExerciseFormSchema';
import BottomActionBox from '../../bottomActionBox/BottomActionBox';
import Input from '../../inputs/Input';
import FormErrorMessage from '../../messages/FormErrorMessage';

export interface ExerciseFormData {
  name: MultilangString[];
}

interface ExerciseFormProps {
  onSubmitForm: (data: ExerciseFormData) => void;
  isLoading: boolean;
}

const ExerciseForm = ({ onSubmitForm, isLoading }: ExerciseFormProps) => {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: yupResolver(addExerciseFormSchema),
    defaultValues: {
      name: [
        {
          lang: 'pl',
          value: '',
        },
        {
          lang: 'en',
          value: '',
        },
      ],
    },
  });

  const { fields: nameFields } = useFieldArray({
    name: 'name',
    control,
  });

  const onSubmit = (data: ExerciseFormData) => onSubmitForm(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack pb="8rem" mt="1rem">
        <Stack gap={2}>
          {nameFields.map((nameField, index) => (
            <Box key={nameField.lang}>
              <Controller
                name={`name.${index}.value`}
                control={control}
                render={({ field }) => (
                  <Input
                    inputProps={{
                      id: `exercise-name-${nameField.lang}`,
                      type: 'text',
                      error: !!errors.name?.[index],
                      label: t(`exerciseForm.name.${nameField.lang}`),
                    }}
                    formFieldProps={{
                      ...field,
                    }}
                  />
                )}
              />
              <FormErrorMessage errors={errors} name={`name.${index}.value`} />
            </Box>
          ))}
        </Stack>

        <FormErrorMessage errors={errors} name="exercises" />
      </Stack>

      <BottomActionBox>
        <Stack gap={1}>
          <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isLoading}>
            {t('exerciseForm.submitBtn')}
          </Button>
        </Stack>
      </BottomActionBox>
    </form>
  );
};

export default ExerciseForm;
