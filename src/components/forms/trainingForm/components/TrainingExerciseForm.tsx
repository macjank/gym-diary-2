import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Collapse, Grid, IconButton, MenuItem, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import useFindTranslation from '../../../../hooks/useFindTranslation';
import useExercisesCollection from '../../../../store/hooks/useExercisesCollection';
import { CallbackDefault } from '../../../../types/commonTypes';
import Input from '../../../inputs/Input';
import FormErrorMessage from '../../../messages/FormErrorMessage';
import ConfirmModal from '../../../modals/confirmModal/ConfirmModal';
import { TrainingFormData } from '../TrainingForm';
import TrainingSetForm from './TrainingSetForm';

interface TrainingExerciseFormProps {
  index: number;
  onRemove: CallbackDefault;
}

const TrainingExerciseForm = ({ index, onRemove }: TrainingExerciseFormProps) => {
  const { t } = useTranslation();
  const { findTranslation } = useFindTranslation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(true);

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
    append({ id: uuidv4(), repetitions: undefined as never, weight: undefined as never });
  };

  return (
    <>
      <Grid mt={'2rem'}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="1rem">
          <Stack direction="row" alignItems="center">
            <Typography variant="h6">{`${t('trainingForm.exerciseTitle')} ${index + 1}`}</Typography>
            <IconButton onClick={() => setIsCollapsed(prev => !prev)}>
              {isCollapsed ? <ArrowDropUp /> : <ArrowDropDown />}
            </IconButton>
          </Stack>
          <IconButton
            onClick={() => setIsDeleteModalOpen(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Collapse in={isCollapsed}>
          <Controller
            name={`exercises.${index}.exerciseId`}
            control={control}
            render={({ field }) => (
              <Input
                inputProps={{
                  id: 'exercise-exerciseId',
                  type: 'email',
                  error: !!errors.exercises?.[index]?.exerciseId,
                  label: t('trainingForm.exerciseNameLabel'),
                  select: true,
                }}
                formFieldProps={{
                  ...field,
                }}
              >
                {exercises.map(ex => (
                  <MenuItem key={ex.id} value={ex.id}>
                    {findTranslation(ex.name)}
                  </MenuItem>
                ))}
              </Input>
            )}
          />

          <FormErrorMessage errors={errors} name={`exercises.${index}.exerciseId`} />

          <FormErrorMessage errors={errors} name={`exercises.${index}.sets`} />

          {sets.map((set, setIndex) => (
            <TrainingSetForm key={set.id} exerciseIndex={index} setIndex={setIndex} onRemove={() => remove(setIndex)} />
          ))}

          <Button fullWidth sx={{ marginTop: '1rem' }} onClick={addSet}>
            {t('trainingForm.addSetBtn')}
          </Button>
        </Collapse>
      </Grid>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title={t('trainingForm.deleteExercise.title')}
        onConfirm={onRemove}
        closeBtnText={t('trainingForm.deleteExercise.cancelBtn')}
        confirmBtnText={t('trainingForm.deleteExercise.confirmBtn')}
      />
    </>
  );
};

export default TrainingExerciseForm;
