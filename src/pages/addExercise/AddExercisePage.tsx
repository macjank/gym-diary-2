import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddExerciseForm, { ExerciseFormData } from '../../components/forms/exerciseForm/ExerciseForm';
import ContentWrapper from '../../components/wrappers/ContentWrapper';

const AddExercisePage = () => {
  const { t } = useTranslation();

  const handleAddExercise = (data: ExerciseFormData) => {
    // TODO:
    console.log(data);
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('addExercise.title')}
      </Typography>
      <Typography sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('addExercise.subtitle')}
      </Typography>

      <AddExerciseForm onSubmitForm={handleAddExercise} isLoading={false} />
    </ContentWrapper>
  );
};

export default AddExercisePage;
