/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { categories, Category } from '../../types';

const categoriesOptions: Category[] = Array.from(categories);

export type CategorySelectProps = {
  value: Category[];
  onChange: (newValue: Category[]) => void;
  label?: string;
  isError?: boolean;
  errorMessage?: string;
};

export const CategorySelect = ({
  value,
  onChange,
  label,
  isError,
  errorMessage
}: CategorySelectProps) => {
  return (
    <Autocomplete
      multiple
      // @ts-ignore
      options={categoriesOptions}
      value={value}
      onChange={(event: any, newValue: Category[] | null) => {
        if (newValue) {
          onChange(newValue);
        }
      }}
      // @ts-ignore
      getOptionLabel={option => option}
      renderInput={params => (
        <TextField
          {...params}
          error={isError}
          helperText={isError && errorMessage}
          variant="standard"
          label={label}
          placeholder="Categories"
        />
      )}
    />
  );
};
