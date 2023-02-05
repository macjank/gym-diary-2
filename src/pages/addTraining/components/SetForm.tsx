import {
  Box,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addRepsForSet,
  addWeightForSet,
  removeSet,
} from "../../../store/slices/trainingFormSlice";
import { TrainingSet } from "../../../types/apiTypes";
import CloseIcon from "@mui/icons-material/Close";

interface SetFormProps {
  exerciseId: string;
  set: TrainingSet;
  number: number;
}

const SetForm = ({ exerciseId, set, number }: SetFormProps) => {
  const dispatch = useDispatch();

  const handleChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const weight = !input ? null : +input;

    dispatch(addWeightForSet({ exerciseId, setId: set.id, weightVal: weight }));
  };

  const handleChangeReps = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const reps = !input ? null : +input;

    dispatch(addRepsForSet({ exerciseId, setId: set.id, repsVal: reps }));
  };

  return (
    <Box key={set.id} mt={"1rem"}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Typography align="center">Set {number}</Typography>
        <IconButton
          onClick={() => dispatch(removeSet({ exerciseId, setId: set.id }))}
          size="large"
          edge="start"
          color="inherit"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <InputLabel htmlFor="exercise-name">Weight (kg)</InputLabel>
          <TextField
            type="number"
            fullWidth
            value={set.weight}
            onChange={handleChangeWeight}
          />
        </Grid>
        <Grid item xs={6}>
          <InputLabel htmlFor="exercise-name">Reps</InputLabel>
          <TextField
            type="number"
            fullWidth
            value={set.repetitions}
            onChange={handleChangeReps}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SetForm;
