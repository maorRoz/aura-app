/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormField } from './FilterConfigurationForm.styled';
import { sendUsersFilters } from '../../../../store';
import { Category } from '../../../../types';
import { CategorySelect } from '../../../CategorySelect';
import { DatePicker } from '../../../DatePicker';
import { Rating } from '../../../Rating';
import { isLoadingAppsSelector } from '../../../../selectors';
import { AsyncButton } from '../../../AsyncButton';

const REQUIRED_NUMBER_OF_CATEGORIES = 3;

export const FilterConfigurationForm = () => {
  const dispatch = useDispatch();

  const [selectedBirthDate, setSelectedBirthDate] = useState(new Date());
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [submitValid, setSubmitValid] = useState(false);

  const submitted = useSelector(isLoadingAppsSelector);

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

  const handleSubmitByEnter = useCallback(
    (e: KeyboardEvent): void => {
      e.preventDefault();
      if (e.keyCode === 13 && submitValid) {
        handleSubmit();
      }
    },
    [submitValid, handleSubmit]
  );

  useEffect(() => {
    document.addEventListener('keyup', handleSubmitByEnter);
    return () => {
      document.removeEventListener('keyup', handleSubmitByEnter);
    };
  }, [handleSubmitByEnter]);

  return (
    <Form data-testid="filter-configuration-form">
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

      <AsyncButton
        testId="submitApps"
        onClick={handleSubmit}
        busy={submitted}
        disabled={submitted || !submitValid}
      >
        SUBMITTED
      </AsyncButton>
    </Form>
  );
};
