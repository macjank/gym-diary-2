import { TextField, TextFieldProps } from '@mui/material';
import { ControllerRenderProps, FieldPath, FieldValues, Path } from 'react-hook-form';

interface InputProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> {
  inputProps?: TextFieldProps;
  formFieldProps?: ControllerRenderProps<TFieldValues, TName>;
  children?: React.ReactNode;
}

const Input = <TFieldValues extends FieldValues, TName extends Path<TFieldValues>>(
  props: InputProps<TFieldValues, TName>,
) => {
  return (
    <TextField {...props.inputProps} name={props.formFieldProps?.name} {...props.formFieldProps} fullWidth>
      {!!props.children && props.children}
    </TextField>
  );
};

export default Input;
