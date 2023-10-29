import { useParams } from 'react-router-dom';
import TrainingForm from '../../components/forms/trainingForm/TrainingForm';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import withLoading from '../../hoc/withLoading';
import useSingleTraining from '../../hooks/api/useSingleTraining';

const TrainingFormWithLoading = withLoading(TrainingForm);

const EditTrainingPage = () => {
  const params = useParams();
  const trainingId = params.id;

  const { training, isLoading, isError } = useSingleTraining({ trainingId });

  const handleEditTraining = () => {
    console.log('sdas');
  };

  return (
    <ContentWrapper>
      <TrainingFormWithLoading
        isError={isError}
        isLoading={isLoading}
        onSubmitForm={handleEditTraining}
        initialTraining={training}
      />
    </ContentWrapper>
  );
};

export default EditTrainingPage;
