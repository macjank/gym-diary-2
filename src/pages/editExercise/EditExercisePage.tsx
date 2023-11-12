import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ExerciseForm, { ExerciseFormData } from '../../components/forms/exerciseForm/ExerciseForm';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import withLoading from '../../hoc/withLoading/withLoading';
import useEditExercise from '../../hooks/api/exercises/useEditExercise';
import useSingleExercise from '../../hooks/api/exercises/useSingleExercise';
import { routes } from '../../routes/routes';

const ExerciseFormWithLoading = withLoading(ExerciseForm);

const EditExercisePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const exerciseId = params.id as string;

  const { exercise, isLoading, isError } = useSingleExercise({ exerciseId });
  const { editExercise } = useEditExercise();

  const handleEditExercise = async (data: ExerciseFormData) => {
    await editExercise({ id: exerciseId, exerciseData: data });
    navigate(routes.allExercises);
  };

  return (
    <ContentWrapper>
      <Typography variant="h5" sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('editExercise.title')}
      </Typography>
      <Typography sx={{ marginBottom: '1.5rem' }} gutterBottom>
        {t('editExercise.subtitle')}
      </Typography>
      <ExerciseFormWithLoading
        isError={isError}
        isLoading={isLoading}
        onSubmitForm={handleEditExercise}
        initialExercise={exercise}
      />
    </ContentWrapper>
  );
};

export default EditExercisePage;
