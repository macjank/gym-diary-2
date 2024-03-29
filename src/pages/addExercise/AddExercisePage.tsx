import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ExerciseForm, { ExerciseFormData } from '../../components/forms/exerciseForm/ExerciseForm';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import useAddExercise from '../../hooks/api/exercises/useAddExercise';
import { routes } from '../../routes/routes';

const AddExercisePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { addExercise, isLoading } = useAddExercise();

  const handleAddExercise = async (data: ExerciseFormData) => {
    await addExercise(data);
    navigate(routes.allExercises);
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('addExercise.title')}
      </Typography>
      <Typography sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('addExercise.subtitle')}
      </Typography>

      <ExerciseForm onSubmitForm={handleAddExercise} isLoading={isLoading} />
    </ContentWrapper>
  );
};

export default AddExercisePage;
