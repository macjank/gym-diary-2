import { Stack } from '@mui/material';
import ContentWrapper from '../../components/wrappers/ContentWrapper';
import HomeLastTrainings from './components/HomeLastTrainings';

const HomePage = () => {
  return (
    <ContentWrapper>
      <Stack>
        <HomeLastTrainings />
      </Stack>
    </ContentWrapper>
  );
};

export default HomePage;
