import { AppActionTypes, SEND_USERS_FILTERS, SAVE_APPS } from './types';
import { App, FilterCriteria } from '../../types';

export const sendUsersFilters = (
  filterCriteria: FilterCriteria
): AppActionTypes => ({
  type: SEND_USERS_FILTERS,
  payload: filterCriteria
});

export const saveApps = (apps: App[]): AppActionTypes => ({
  type: SAVE_APPS,
  payload: apps
});
