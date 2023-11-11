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
import useFindTranslation from '../../../../../hooks/useFindTranslation';
import useExercisesCollection from '../../../../../store/hooks/useExercisesCollection';
import { ITrainingExercise } from '../../../../../types/trainingTypes';
import { findExerciseName } from '../utils/findExerciseName';

interface TrainingDetailsExercisesProps {
  exercises: ITrainingExercise[];
}

const TrainingDetailsExercises = ({ exercises }: TrainingDetailsExercisesProps) => {
  const { t } = useTranslation();
  const { findTranslation } = useFindTranslation();

  const { exercises: exercisesCollection } = useExercisesCollection();

  return (
    <Stack>
      {exercises.map((exercise, index) => {
        const exerciseNames = findExerciseName({ exerciseId: exercise.exerciseId, exercisesCollection });
        const translatedName = findTranslation(exerciseNames ?? []);

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
