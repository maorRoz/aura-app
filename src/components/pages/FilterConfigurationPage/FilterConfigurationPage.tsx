import React from 'react';
import { useSelector } from 'react-redux';
import { FilterConfigurationForm } from './FilterConfigurationForm';
import { SelectedAppsGrid } from './SelectedAppsGrid';
import {
  isLoadingAppsFailedSelector,
  isFetchedAppsSelector
} from '../../../selectors';

const ErrorState = () => (
  <div style={{ color: 'red', fontWeight: 'bold', fontSize: '16px' }}>
    Failed to load apps :(
  </div>
);
export const FilterConfigurationPage = () => {
  const isError = useSelector(isLoadingAppsFailedSelector);
  const isFetched = useSelector(isFetchedAppsSelector);

  return (
    <>
      <FilterConfigurationForm />
      {isFetched && !isError && <SelectedAppsGrid />}
      {isError && <ErrorState />}
    </>
  );
};
