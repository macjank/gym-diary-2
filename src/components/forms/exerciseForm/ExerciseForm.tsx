import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { addExerciseFormSchema } from '../../../utils/validationSchemas/addExerciseFormSchema';
import BottomActionBox from '../../bottomActionBox/BottomActionBox';
import Input from '../../inputs/Input';
import FormErrorMessage from '../../messages/FormErrorMessage';

export interface ExerciseFormData {
  namePl: string;
  nameEn: string;
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
  });

  const onSubmit = (data: ExerciseFormData) => onSubmitForm(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack pb="8rem" mt="1rem">
        <Stack gap={2}>
          <Box>
            <Controller
              name="namePl"
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    id: 'exercise-name-pl',
                    type: 'text',
                    error: !!errors.namePl,
                    label: t('exerciseForm.namePl'),
                  }}
                  formFieldProps={{
                    ...field,
                  }}
                />
              )}
            />
            <FormErrorMessage errors={errors} name="namePl" />
          </Box>

          <Box>
            <Controller
              name="nameEn"
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    id: 'exercise-name-pl',
                    type: 'text',
                    error: !!errors.nameEn,
                    label: t('exerciseForm.nameEn'),
                  }}
                  formFieldProps={{
                    ...field,
                  }}
                />
              )}
            />
            <FormErrorMessage errors={errors} name="nameEn" />
          </Box>
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
