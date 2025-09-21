'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';

interface DateRangePickerProps {
  startDate: Moment | null;
  endDate: Moment | null;
  onStartDateChange: (date: Moment | null) => void;
  onEndDateChange: (date: Moment | null) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="flex items-center gap-4">
        <DatePicker
          label="From"
          value={startDate}
          onChange={onStartDateChange}
          slotProps={{
            textField: {
              size: "small",
              placeholder: "Select start date",
              sx: { 
                backgroundColor: '#f4f4f4',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e5e7eb',
                  },
                },
              }
            }
          }}
          maxDate={endDate || undefined}
        />
        <DatePicker
          label="To"
          value={endDate}
          onChange={onEndDateChange}
          slotProps={{
            textField: {
              size: "small",
              placeholder: "Select end date",
              sx: { 
                backgroundColor: '#f4f4f4',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#e5e7eb',
                  },
                },
              }
            }
          }}
          minDate={startDate || undefined}
        />
      </div>
    </LocalizationProvider>
  );
}