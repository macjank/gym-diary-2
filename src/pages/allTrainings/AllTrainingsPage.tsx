import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddTrainingFAB from '../../components/buttons/addTrainingFAB/AddTrainingFAB';
import TrainingsList from '../../components/lists/trainingsList/TrainingsList';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import withLoading from '../../hoc/withLoading';
import useTrainings from '../../hooks/api/useTrainings';

const TrainingsListWithLoading = withLoading(TrainingsList);

const AllTrainingsPage = () => {
  const { t } = useTranslation();
  const { trainings, isLoading, isError } = useTrainings();

  return (
    <>
      <ContentWrapper>
        <Stack>
          <Typography variant="h5">{t('allTrainings.title')}</Typography>

          <TrainingsListWithLoading isLoading={isLoading} isError={isError} trainings={trainings} />
        </Stack>
      </ContentWrapper>

      <AddTrainingFAB />
    </>
  );
};

export default AllTrainingsPage;
