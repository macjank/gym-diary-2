import { useParams } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import withLoading from '../../hoc/withLoading/withLoading';
import useSingleTraining from '../../hooks/api/trainings/useSingleTraining';
import { ITraining } from '../../types/trainingTypes';
import TrainingDetailsView from './components/trainingDetailsView/TrainingDetailsView';

const TrainingDetailsViewWithLoading = withLoading(TrainingDetailsView);

const TrainingDetailsPage = () => {
  const params = useParams();
  const trainingId = params.id;

  const { training, isLoading, isError } = useSingleTraining({ trainingId });

  return (
    <ContentWrapper>
      <TrainingDetailsViewWithLoading
        training={training as ITraining}
        isLoading={isLoading || !training}
        isError={isError}
      />
    </ContentWrapper>
  );
};

export default TrainingDetailsPage;
