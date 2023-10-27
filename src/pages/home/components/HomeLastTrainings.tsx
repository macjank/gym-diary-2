import { ChevronRight } from '@mui/icons-material';
import { CircularProgress, Divider, List, ListItem, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useTrainings from '../../../hooks/api/useTrainings';
import { routes } from '../../../routes/routes';

const numOfTrainings = 3;

const HomeLastTrainings = () => {
  const { t } = useTranslation();
  const { trainings, isLoading } = useTrainings({ limit: numOfTrainings });

  return (
    <Stack>
      <Typography variant="h5">{t('home.title')}</Typography>

      {isLoading ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <List>
          {trainings?.map((training, index) => (
            <Fragment key={training.id}>
              <Link to={routes.trainingDetails(training.id)}>
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
              </Link>
              {index !== trainings.length - 1 && <Divider />}
            </Fragment>
          ))}
        </List>
      )}
    </Stack>
  );
};

export default HomeLastTrainings;
