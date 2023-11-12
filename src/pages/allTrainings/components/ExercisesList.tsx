import { Edit } from '@mui/icons-material';
import { Divider, List, ListItem, Link as MUILink, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useFindTranslation from '../../../hooks/useFindTranslation';
import { routes } from '../../../routes/routes';
import { IExercise } from '../../../types/exerciseTypes';

interface ExercisesListProps {
  exercises: IExercise[];
}

const ExercisesList = ({ exercises }: ExercisesListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { findTranslation } = useFindTranslation();

  if (exercises.length === 0) {
    return (
      <Stack alignItems="center" my={3} gap={1}>
        <Typography>{t('allExercises.emptyList')}</Typography>
        <MUILink component="button" variant="body2" onClick={() => navigate(routes.addExercise)}>
          {t('allExercises.addFirst')}
        </MUILink>
      </Stack>
    );
  }

  return (
    <List>
      {exercises?.map((exercise, index) => (
        <Fragment key={exercise.id}>
          {/* //TODO:add edit */}
          <RouterLink to={routes.addExercise}>
            <ListItem
              sx={{
                padding: '1.5rem 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{findTranslation(exercise.name)}</Typography>
              <Edit />
            </ListItem>
          </RouterLink>
          {index !== exercises.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
};

export default ExercisesList;
