/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { Form, FormField } from './FilterConfigurationForm.styled';
import { sendUsersFilters } from '../../../../store';
import { Category } from '../../../../types';
import { CategorySelect } from '../../../CategorySelect';
import { DatePicker } from '../../../DatePicker';
import { Rating } from '../../../Rating';

const REQUIRED_NUMBER_OF_CATEGORIES = 3;

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
    if (selectedCategories.length !== REQUIRED_NUMBER_OF_CATEGORIES) {
      setSubmitValid(false);
      if (selectedCategories.length > REQUIRED_NUMBER_OF_CATEGORIES) {
        setTooMuchCategoriesSelectedError(true);
      }
    } else {
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
    <Form>
      <FormField>
        <CategorySelect
          value={selectedCategories}
          onChange={setSelectedCategories}
          label="Select Top 3 Most Favorable Categories"
          isError={tooMuchCategoriesSelected}
          errorMessage="You cannot select more than 3 categories"
        />
      </FormField>
      <FormField>
        <DatePicker
          value={selectedBirthDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          label="Birthdate"
        />
      </FormField>
      <FormField>
        <Rating
          value={selectedRating}
          onChange={setSelectedRating}
          label="Rating"
        />
      </FormField>

      <Button
        style={{ marginBottom: '20px' }}
        variant="contained"
        color="primary"
        disabled={!submitValid}
        onClick={handleSubmit}
      >
        SUBMIT
      </Button>
    </Form>
  );
};
