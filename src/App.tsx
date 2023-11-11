import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import ExercisesService from './services/exercises/ExercisesService';
import store from './store';
import { setExercisesCategories } from './store/slices/exercisesCategoriesCollectionSlice';
import { setExercises } from './store/slices/exercisesCollectionSlice';
import './styles/global.css';

function App() {
  const getExercisesInitData = async () => {
    const categories = await ExercisesService.getExercisesCategories();
    store.dispatch(setExercisesCategories({ exercisesCategories: categories }));

    const exercises = await ExercisesService.getExercises();
    store.dispatch(setExercises({ exercises }));
  };

  useEffect(() => {
    getExercisesInitData();
  }, []);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppRoutes />
          </LocalizationProvider>
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
