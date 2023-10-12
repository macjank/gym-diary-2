import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface CustomDatePickerProps {
  label: string;
  value: Date | null;
  setValue: (newDate: Date | null | undefined) => void;
}

const CustomDatePicker = ({ label, value, setValue }: CustomDatePickerProps) => {
  return (
    <DatePicker
      label={label}
      value={!!value ? dayjs(value) : null}
      onChange={val => setValue(val?.toDate())}
      sx={{ width: '100%' }}
      format="DD/MM/YYYY"
    />
  );
};

export default CustomDatePicker;
