import { Link as MUILink, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import TrainingsList from '../../../components/lists/trainingsList/TrainingsList';
import withLoading from '../../../hoc/withLoading/withLoading';
import useTrainings from '../../../hooks/api/auth/useTrainings';
import { routes } from '../../../routes/routes';

const numOfTrainings = 3;

const TrainingsListWithLoading = withLoading(TrainingsList);

const HomeLastTrainings = () => {
  const { t } = useTranslation();
  const { trainings, isLoading, isError } = useTrainings({ limit: numOfTrainings });

  return (
    <Stack>
      <Typography variant="h5">{t('home.title')}</Typography>

      <TrainingsListWithLoading isLoading={isLoading} isError={isError} trainings={trainings} />

      {trainings.length !== 0 && (
        <Stack justifyContent="center" alignItems="center">
          <RouterLink to={routes.allTrainings}>
            <MUILink component="button" variant="body2">
              {t('home.seeAllTrainingsBtn')}
            </MUILink>
          </RouterLink>
        </Stack>
      )}
    </Stack>
  );
};

export default HomeLastTrainings;
