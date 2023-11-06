import { ChevronRight } from '@mui/icons-material';
import { Divider, List, ListItem, Link as MUILink, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { ITraining } from '../../../types/trainingTypes';

interface TrainingsListProps {
  trainings: ITraining[];
}

const TrainingsList = ({ trainings }: TrainingsListProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (trainings.length === 0) {
    return (
      <Stack alignItems="center" my={3} gap={1}>
        <Typography>{t('trainingsList.emptyList')}</Typography>
        <MUILink
          component="button"
          variant="body2"
          onClick={() => {
            navigate(routes.addTraining);
          }}
        >
          {t('trainingsList.addFirst')}
        </MUILink>
      </Stack>
    );
  }
  return (
    <List>
      {trainings?.map((training, index) => (
        <Fragment key={training.id}>
          <RouterLink to={routes.trainingDetails(training.id)}>
            <ListItem
              sx={{
                padding: '1.5rem 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>{training.date.toLocaleDateString()}</Typography>
              <ChevronRight />
            </ListItem>
          </RouterLink>
          {index !== trainings.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
};

export default TrainingsList;
