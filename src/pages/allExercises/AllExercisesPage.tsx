import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import { routes } from '../../routes/routes';

const AllExercisesPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <ContentWrapper>
        <Stack>
          <Typography variant="h5">{t('allExercises.title')}</Typography>
          {/* //TODO: display exercises list */}
        </Stack>
      </ContentWrapper>

      <Box sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
        <Link to={routes.addExercise}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </Box>
    </>
  );
};

export default AllExercisesPage;
