import { CircularProgress, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useTrainings from '../../hooks/api/useTrainings';

const AllTrainings = () => {
  const { t } = useTranslation();
  const { trainings, isLoading } = useTrainings();

  return (
    <ContentWrapper>
      <Stack>
        <Typography variant="h5">{t('allTrainings.title')}</Typography>

        {isLoading ? (
          <Stack alignItems="center">
            <CircularProgress />
          </Stack>
        ) : (
          <Stack>
            {trainings?.map(training => (
              <Typography key={training.id}>{training.date.toLocaleDateString()}</Typography>
            ))}
          </Stack>
        )}
      </Stack>
    </ContentWrapper>
  );
};

export default AllTrainings;
