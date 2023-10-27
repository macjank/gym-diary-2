import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import useExercisesCollection from '../../../../../store/hooks/useExercisesCollection';
import { ApiBaseExercise } from '../../../../../types/apiTypes';
import { Lang } from '../../../../../types/globalTypes';
import { ITrainingExercise } from '../../../../../types/trainingTypes';

const findExerciseName = ({
  exerciseId,
  exercisesCollection,
}: {
  exerciseId: string;
  exercisesCollection: ApiBaseExercise[];
}) => {
  return exercisesCollection.find(exercise => exercise.id === exerciseId)?.name;
};

interface TrainingDetailsExercisesProps {
  exercises: ITrainingExercise[];
}

const TrainingDetailsExercises = ({ exercises }: TrainingDetailsExercisesProps) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage ?? Lang.PL;

  const { exercises: exercisesCollection } = useExercisesCollection();

  return (
    <Stack>
      {exercises.map((exercise, index) => {
        const exerciseNames = findExerciseName({ exerciseId: exercise.exerciseId, exercisesCollection });
        const translatedName = exerciseNames?.[currentLang];

        return (
          <Box key={exercise.id} mt={3}>
            <Typography variant="h6" mb={2}>{`${index + 1}. ${translatedName}`}</Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('trainingDetails.set')}</TableCell>
                    {exercise.sets.map((_, setIndex) => (
                      <TableCell key={setIndex}>{setIndex + 1}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{t('trainingDetails.repetitions')}</TableCell>
                    {exercise.sets.map((set, setIndex) => (
                      <TableCell key={setIndex}>{set.repetitions}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell>{t('trainingDetails.weight')}</TableCell>
                    {exercise.sets.map((set, setIndex) => (
                      <TableCell key={setIndex}>{set.weight}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Stack>
  );
};

export default TrainingDetailsExercises;
