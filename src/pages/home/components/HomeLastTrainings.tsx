import { CircularProgress, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useTrainings from '../../../hooks/api/useTrainings';

const numOfTrainings = 3;

const HomeLastTrainings = () => {
  const { t } = useTranslation();
  const { trainings: lastTrainings, isLoading } = useTrainings({ limit: numOfTrainings });

  return (
    <Stack>
      <Typography variant="h5">{t('home.title')}</Typography>

      {isLoading ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Stack>
          {lastTrainings?.map(training => (
            <Typography key={training.id}>{training.date.toLocaleDateString()}</Typography>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default HomeLastTrainings;
