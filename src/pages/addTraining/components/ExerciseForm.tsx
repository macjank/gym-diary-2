import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBaseExercises,
  selectBaseMuscles,
} from "../../../store/slices/exercisesBaseSlice";
import {
  addSet,
  removeExercise,
  selectBaseExerciseForExercise,
  selectMuscleForExercise,
} from "../../../store/slices/trainingFormSlice";
import { TrainingExercise } from "../../../types/apiTypes";
import SetForm from "./SetForm";
import CloseIcon from "@mui/icons-material/Close";

interface ExerciseFormProps {
  exercise: TrainingExercise;
  number: number;
}

const ExerciseForm = ({ exercise, number }: ExerciseFormProps) => {
  const dispatch = useDispatch();

  const baseExercises = useSelector(selectBaseExercises);
  const baseMuscles = useSelector(selectBaseMuscles);

  const getExercisesByMuscleId = (muscleId: string) => {
    return baseExercises.filter((exercise) => exercise.muscleId === muscleId);
  };

  const handleSelectMuscle = (e: any) => {
    const muscleId = e.target.value;

    dispatch(selectMuscleForExercise({ exerciseId: exercise.id, muscleId }));
  };

  const handleSelectBaseExercise = (e: any) => {
    const baseExerciseId = e.target.value;

    dispatch(
      selectBaseExerciseForExercise({ exerciseId: exercise.id, baseExerciseId })
    );
  };

  return (
    <Grid key={exercise.id} mt={"2rem"}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="1rem"
      >
        <Typography variant="h6">Exercise {number}</Typography>
        <IconButton
          onClick={() => dispatch(removeExercise({ exerciseId: exercise.id }))}
          size="large"
          edge="start"
          color="inherit"
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <InputLabel htmlFor="muscle">Muscle</InputLabel>
      <Select
        id="muscle"
        value={exercise.muscleId}
        onChange={handleSelectMuscle}
        sx={{ width: "100%" }}
      >
        {baseMuscles.map((muscle) => (
          <MenuItem key={muscle.id} value={muscle.id}>
            {muscle.name}
          </MenuItem>
        ))}
      </Select>

      <InputLabel htmlFor="exercise-name">Exercise name</InputLabel>
      <Select
        id="exercise-name"
        value={exercise.baseExerciseId}
        onChange={handleSelectBaseExercise}
        sx={{ width: "100%" }}
      >
        {getExercisesByMuscleId(exercise.muscleId).map((baseExercise) => (
          <MenuItem value={baseExercise.id}>{baseExercise.name}</MenuItem>
        ))}
      </Select>

      {exercise.sets.map((set, index) => (
        <SetForm exerciseId={exercise.id} set={set} number={index + 1} />
      ))}

      <Button
        onClick={() => dispatch(addSet({ exerciseId: exercise.id }))}
        sx={{ marginTop: "1rem", width: "100%" }}
      >
        Add set
      </Button>
    </Grid>
  );
};

export default ExerciseForm;
