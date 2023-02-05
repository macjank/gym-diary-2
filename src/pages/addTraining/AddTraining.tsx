import {
  Alert,
  Button,
  ButtonGroup,
  Grid,
  Input,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import ContentWrapper from "../../components/wrappers/ContentWrapper";
import { AlertServerities } from "../../types/alertSeverities";

import ExerciseForm from "./components/ExerciseForm";
import useAddTraining from "./components/hooks/useAddTraining";

const AddTraining = () => {
  const {
    date,
    handleChangeDate,
    gym,
    handleChangeGym,
    trainingExercises,
    handleAddExercise,
    handleSubmitTraining,
    errorMessage,
    dismissErrorMessage,
    isSending,
  } = useAddTraining();

  return (
    <>
      <ContentWrapper>
        <Typography variant="h5" sx={{ marginBottom: "1.5rem" }} gutterBottom>
          New training
        </Typography>
        <form onSubmit={handleSubmitTraining}>
          <Grid container>
            <Grid item xs={6}>
              <InputLabel htmlFor="date">Date</InputLabel>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={handleChangeDate}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="Gym"
                value={gym}
                onChange={handleChangeGym}
              />
            </Grid>
          </Grid>

          {trainingExercises.map((exercise, index) => (
            <ExerciseForm exercise={exercise} number={index + 1} />
          ))}

          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "1.6rem",
            }}
          >
            <Button variant="contained" onClick={handleAddExercise}>
              Add exercise
            </Button>
            <Button type="submit" disabled={isSending} variant="contained">
              Save
            </Button>
            <Button variant="contained">Save</Button>
          </ButtonGroup>
        </form>
      </ContentWrapper>

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={dismissErrorMessage}
      >
        <Alert
          onClose={dismissErrorMessage}
          severity={AlertServerities.Error}
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddTraining;
