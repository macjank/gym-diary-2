import { Stack } from '@mui/material';
import AddTrainingFAB from '../../components/buttons/addTrainingFAB/AddTrainingFAB';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import HomeLastTrainings from './components/HomeLastTrainings';

const HomePage = () => {
  return (
    <ContentWrapper>
      <Stack>
        <HomeLastTrainings />

        <AddTrainingFAB />
      </Stack>
    </ContentWrapper>
  );
};

export default HomePage;
