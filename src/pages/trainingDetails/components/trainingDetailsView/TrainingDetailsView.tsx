import { Delete, Edit } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../../../routes/routes';
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
          <Link to={routes.editTraining(training.id)}>
            <IconButton sx={{ boxShadow: 2 }}>
              <Edit />
            </IconButton>
          </Link>
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
