import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ITraining } from '../../../types/trainingTypes';

interface TrainingDetailsViewProps {
  training: ITraining;
}

const TrainingDetailsView = ({ training }: TrainingDetailsViewProps) => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography variant={'h5'}>{t('trainingDetails.title')}</Typography>
      <Typography>{`Data: ${training?.date.toLocaleDateString()}`}</Typography>
    </Stack>
  );
};

export default TrainingDetailsView;
