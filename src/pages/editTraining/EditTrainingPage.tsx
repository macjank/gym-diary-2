import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import TrainingForm, { TrainingFormData } from '../../components/forms/trainingForm/TrainingForm';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import withLoading from '../../hoc/withLoading';
import useEditTraining from '../../hooks/api/useEditTraining';
import useSingleTraining from '../../hooks/api/useSingleTraining';
import { routes } from '../../routes/routes';

const TrainingFormWithLoading = withLoading(TrainingForm);

const EditTrainingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const params = useParams();
  const trainingId = params.id as string;

  const { training, isLoading, isError } = useSingleTraining({ trainingId });
  const { editTraining } = useEditTraining();

  const handleEditTraining = async (data: TrainingFormData) => {
    await editTraining({ id: trainingId, trainingData: data });
    navigate(routes.trainingDetails(trainingId));
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('editTraining.title')}
      </Typography>

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
