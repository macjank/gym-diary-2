import { CircularProgress, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useSingleTraining from '../../hooks/api/useSingleTraining';
import TrainingDetailsView from './components/TrainingDetailsView';

const TrainingDetailsPage = () => {
  const params = useParams();
  const trainingId = params.id;

  const { training } = useSingleTraining({ trainingId });

  return (
    <ContentWrapper>
      {/* // TODO: add async data wrapper - handle loading and error */}
      {!training ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <TrainingDetailsView training={training} />
      )}
    </ContentWrapper>
  );
};

export default TrainingDetailsPage;
