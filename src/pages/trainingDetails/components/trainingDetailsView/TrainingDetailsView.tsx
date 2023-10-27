import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ITraining } from '../../../../types/trainingTypes';
import TrainingDetailsExercises from './components/TrainingDetailsExercises';

export interface TrainingDetailsViewProps {
  training: ITraining;
}

const TrainingDetailsView = ({ training }: TrainingDetailsViewProps) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
        <Typography variant="h5">{training?.date.toLocaleDateString()}</Typography>

        <Stack direction="row" gap={2}>
          {/* //TODO: navigate to edit page */}
          <IconButton sx={{ boxShadow: 2 }}>
            <Edit />
          </IconButton>
          {/* //TODO: delete training */}
          <IconButton sx={{ boxShadow: 2 }}>
            <Delete />
          </IconButton>
        </Stack>
      </Stack>

      <TrainingDetailsExercises exercises={training.exercises} />
    </Box>
  );
};

export default TrainingDetailsView;
