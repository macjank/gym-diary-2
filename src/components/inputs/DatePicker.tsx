import { DatePicker as MUIDatepicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface DatePickerProps {
  label: string;
  value: Date | null;
  setValue: (newDate: Date | null | undefined) => void;
}

const DatePicker = ({ label, value, setValue }: DatePickerProps) => {
  return (
    <MUIDatepicker
      label={label}
      value={!!value ? dayjs(value) : null}
      onChange={val => setValue(val?.toDate())}
      sx={{ width: '100%' }}
      format="DD/MM/YYYY"
    />
  );
};

export default DatePicker;
