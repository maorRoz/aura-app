/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDispatch } from 'react-redux';
import { sendUsersFilters } from '../../../../store';
import { categories, Category } from '../../../../types';

const categoriesOptions: Category[] = Array.from(categories);

export const FilterConfigurationForm = () => {
  const dispatch = useDispatch();

  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [submitValid, setSubmitValid] = useState(false);

  const handleDateChange = (date: Date) => {
    setSelectedBirthDate(date);
  };

  const [
    tooMuchCategoriesSelected,
    setTooMuchCategoriesSelectedError
  ] = useState(false);

  useEffect(() => {
    if (selectedCategories.length > 3) {
      setTooMuchCategoriesSelectedError(true);
      setSubmitValid(false);
    } else if (selectedCategories.length === 3) {
      setTooMuchCategoriesSelectedError(false);
      setSubmitValid(true);
    }
  }, [selectedCategories, submitValid]);

  const handleSubmit = useCallback(() => {
    setTooMuchCategoriesSelectedError(false);
    dispatch(
      sendUsersFilters({
        birthdate: moment(selectedBirthDate).toISOString(),
        rating: selectedRating,
        prefferedCategories: selectedCategories
      })
    );
  }, [dispatch, selectedBirthDate, selectedRating, selectedCategories]);

  return (
    <div>
      <Autocomplete
        multiple
        // @ts-ignore
        options={categoriesOptions}
        value={selectedCategories}
        onChange={(event: any, newValue: Category[] | null) => {
          if (newValue) {
            setSelectedCategories(newValue);
          }
        }}
        // @ts-ignore
        getOptionLabel={option => option}
        renderInput={params => (
          <TextField
            {...params}
            error={tooMuchCategoriesSelected}
            helperText={
              tooMuchCategoriesSelected &&
              'You cannot select more than 3 categories'
            }
            variant="standard"
            label="Select Top 3 Most Favorable Categories"
            placeholder="Categories"
          />
        )}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          label="Birthdate"
          value={selectedBirthDate}
          // @ts-ignore
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
      <div>
        <Typography component="legend">Rating</Typography>
        <Rating
          value={selectedRating}
          onChange={(event, newValue) => {
            setSelectedRating(newValue ?? 1);
          }}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        disabled={!submitValid}
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </div>
  );
};
