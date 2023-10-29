import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useAddTraining from '../../hooks/api/useAddTraining';
import { routes } from '../../routes/routes';
import TrainingForm, { TrainingFormData } from './TrainingForm';

const AddTrainingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { addTraining, isLoading } = useAddTraining();

  const handleAddTraining = async (data: TrainingFormData) => {
    const requestData = {
      ...data,
      createdAt: new Date(),
    };

    await addTraining(requestData);
    navigate(routes.home);
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('addTraining.title')}
      </Typography>

      <TrainingForm onSubmitForm={handleAddTraining} isLoading={isLoading} />
    </ContentWrapper>
  );
};

export default AddTrainingPage;
