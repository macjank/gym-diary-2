import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from '../../../../components/modals/confirmModal/ConfirmModal';
import useDeleteTraining from '../../../../hooks/api/useDeleteTraining';
import { routes } from '../../../../routes/routes';
import { ITraining } from '../../../../types/trainingTypes';
import TrainingDetailsExercises from './components/TrainingDetailsExercises';

export interface TrainingDetailsViewProps {
  training: ITraining;
}

const TrainingDetailsView = ({ training }: TrainingDetailsViewProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteTraining } = useDeleteTraining();

  const handleDeleteTraining = async () => {
    await deleteTraining(training.id);
    navigate(routes.allTrainings);
  };

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography variant="h5">{training?.date.toLocaleDateString()}</Typography>

          <Stack direction="row" gap={2}>
            <Link to={routes.editTraining(training.id)}>
              <IconButton sx={{ boxShadow: 2 }}>
                <Edit />
              </IconButton>
            </Link>
            <IconButton onClick={() => setIsDeleteModalOpen(true)} sx={{ boxShadow: 2 }}>
              <Delete />
            </IconButton>
          </Stack>
        </Stack>

        <TrainingDetailsExercises exercises={training.exercises} />
      </Box>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        title={t('trainingDetails.delete.title')}
        onConfirm={handleDeleteTraining}
        closeBtnText={t('trainingDetails.delete.cancelBtn')}
        confirmBtnText={t('trainingDetails.delete.confirmBtn')}
      />
    </>
  );
};

export default TrainingDetailsView;
