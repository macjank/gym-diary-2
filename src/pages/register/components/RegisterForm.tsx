import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { registerFormSchema } from '../../../static/validationSchemas/registerFormSchema';
import { ApiPasswordRegisterRequest } from '../../../types/apiTypes';

interface RegisterFormProps {
  onSubmitForm: ({ email, password }: ApiPasswordRegisterRequest) => Promise<void>;
}

//TODO:
const RegisterForm = ({ onSubmitForm }: RegisterFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async ({ email, password }: ApiPasswordRegisterRequest) => {
    await onSubmitForm({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField id="email" type="email" {...field} error={!!errors.email} />}
          />
          {errors['email'] && (
            <Typography variant="caption" color="error">
              {errors['email'].message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="email">Password</InputLabel>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField id="password" type="password" {...field} error={!!errors.password} />}
          />
          {errors['password'] && (
            <Typography variant="caption" color="error">
              {errors['password'].message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;
