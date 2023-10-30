import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import withLoading from '../../hoc/withLoading';
import useSingleTraining from '../../hooks/api/useSingleTraining';

const TrainingFormWithLoading = withLoading(TrainingForm);

const EditTrainingPage = () => {
  const { t } = useTranslation();
  const params = useParams();
  const trainingId = params.id;

  const { training, isLoading, isError } = useSingleTraining({ trainingId });

  const handleEditTraining = () => {
    console.log('sdas');
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
