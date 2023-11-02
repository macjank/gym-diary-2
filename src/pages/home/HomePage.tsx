import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Link as MUILink, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import { routes } from '../../routes/routes';
import HomeLastTrainings from './components/HomeLastTrainings';

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <ContentWrapper>
      <Stack>
        <HomeLastTrainings />

        <Stack justifyContent="center" alignItems="center">
          <RouterLink to={routes.allTrainings}>
            <MUILink component="button" variant="body2">
              {t('home.seeAllTrainingsBtn')}
            </MUILink>
          </RouterLink>
        </Stack>

        <Box sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
          <RouterLink to={routes.addTraining}>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </RouterLink>
        </Box>
      </Stack>
    </ContentWrapper>
  );
};

export default HomePage;
