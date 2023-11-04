import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes/routes';

const AddTrainingFAB = () => {
  return (
    <Box sx={{ position: 'fixed', bottom: '1rem', right: '1rem' }}>
      <Link to={routes.addTraining}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
};

export default AddTrainingFAB;
