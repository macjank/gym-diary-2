import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import TrainingsService from './services/trainings/TrainingsService';
import store from './store';
import './styles/global.css';
import { theme } from './styles/theme';

function App() {
  //TODO:
  useEffect(() => {
    TrainingsService.getExercisesCategories();
    TrainingsService.getExercises();
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AppRoutes />
            </LocalizationProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
