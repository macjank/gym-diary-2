import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/inputs/TextInput';
import FormErrorMessage from '../../../components/messages/FormErrorMessage';
import ConfirmModal from '../../../components/modals/confirmModal/ConfirmModal';
import { CallbackDefault } from '../../../types/commonTypes';
import { TrainingFormData } from '../TrainingForm';

interface SetFormProps {
  exerciseIndex: number;
  setIndex: number;
  onRemove: CallbackDefault;
}

const SetForm = ({ exerciseIndex, setIndex, onRemove }: SetFormProps) => {
  const { t } = useTranslation();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext<TrainingFormData>();

  const handleDeleteSetClick = () => {
    const isRepsTouched = !!touchedFields?.exercises?.[exerciseIndex]?.sets?.[setIndex]?.repetitions;
    const isWeightTouched = !!touchedFields?.exercises?.[exerciseIndex]?.sets?.[setIndex]?.weight;

    if (isRepsTouched || isWeightTouched) {
      setIsDeleteModalOpen(true);
    } else {
      onRemove();
    }
  };

  return (
    <>
      <Box mt={'1rem'}>
        <Box display="flex" justifyContent="center" alignItems="center" gap="1rem">
          <Typography align="center">{`${t('trainingForm.setTitle')} ${setIndex + 1}`}</Typography>
          <IconButton onClick={handleDeleteSetClick} size="large" edge="start" color="inherit" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Controller
              name={`exercises.${exerciseIndex}.sets.${setIndex}.repetitions`}
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    id: 'set-repetitions',
                    type: 'number',
                    error: !!errors.exercises?.[exerciseIndex]?.sets?.[setIndex]?.repetitions,
                    label: t('trainingForm.setRepsLabel'),
                  }}
                  formFieldProps={{
                    ...field,
                  }}
                />
              )}
            />
            <FormErrorMessage errors={errors} name={`exercises.${exerciseIndex}.sets.${setIndex}.repetitions`} />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`}
              control={control}
              render={({ field }) => (
                <Input
                  inputProps={{
                    id: 'set-weight',
                    type: 'number',
                    error: !!errors.exercises?.[exerciseIndex]?.sets?.[setIndex]?.weight,
                    label: t('trainingForm.setWeightLabel'),
                  }}
                  formFieldProps={{
                    ...field,
                  }}
                />
              )}
            />
            <FormErrorMessage errors={errors} name={`exercises.${exerciseIndex}.sets.${setIndex}.weight`} />
          </Grid>
        </Grid>
      </Box>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title="Czy na pewno chcesz usunąć tę serię?"
        onConfirm={onRemove}
        closeBtnText="Anuluj"
        confirmBtnText="Usuń"
      />
    </>
  );
};

export default SetForm;
