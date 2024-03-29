import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TrainingForm, { TrainingFormData } from '../../components/forms/trainingForm/TrainingForm';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useAddTraining from '../../hooks/api/trainings/useAddTraining';
import { routes } from '../../routes/routes';
import { LocalStorageKey } from '../../types/localStorageKeyEnum';
import { LocaleStorageHelper } from '../../utils/localeStorageHelper/LocaleStorageHelper';

const AddTrainingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { addTraining, isLoading } = useAddTraining();

  const handleAddTraining = async (data: TrainingFormData) => {
    await addTraining(data);
    LocaleStorageHelper.removeItem(LocalStorageKey.newTrainingForm);
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
