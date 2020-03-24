/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export type DatePickerProps = {
  value: Date;
  onChange: (newValue: Date) => void;
  dateFormat: string;
  label?: string;
};

export const DatePicker = ({ value, onChange }: DatePickerProps) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="dd/MM/yyyy"
      label="Birthdate"
      value={value}
      // @ts-ignore
      onChange={onChange}
    />
  </MuiPickersUtilsProvider>
);
