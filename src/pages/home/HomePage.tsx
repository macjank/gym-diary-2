import { Link as MUILink, Stack } from '@mui/material';
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

        <RouterLink to={routes.allTrainings}>
          <MUILink component="button" variant="body2">
            {t('home.seeAllTrainingsBtn')}
          </MUILink>
        </RouterLink>
      </Stack>
    </ContentWrapper>
  );
};

export default HomePage;
