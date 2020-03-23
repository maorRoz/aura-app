import { AppActionTypes, SEND_USERS_FILTERS, SAVE_APPS } from './types';
import { App, UserFiltersDto } from '../../types';

export const sendUsersFilters = (
  userFilters: UserFiltersDto
): AppActionTypes => ({
  type: SEND_USERS_FILTERS,
  payload: userFilters
});

export const saveApps = (apps: App[]): AppActionTypes => ({
  type: SAVE_APPS,
  payload: apps
});
