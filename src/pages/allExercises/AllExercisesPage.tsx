import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import { routes } from '../../routes/routes';
import useExercisesCollection from '../../store/hooks/useExercisesCollection';
import ExercisesList from '../allTrainings/components/ExercisesList';

const AllExercisesPage = () => {
  const { t } = useTranslation();

  const { exercises } = useExercisesCollection();

  return (
    <>
      <ContentWrapper>
        <Stack>
          <Typography variant="h5">{t('allExercises.title')}</Typography>
          <ExercisesList exercises={exercises} />
        </Stack>
      </ContentWrapper>

      <Box sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Link to={routes.addExercise}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </>
  );
};

export default AllExercisesPage;
