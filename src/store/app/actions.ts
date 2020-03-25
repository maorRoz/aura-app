import {
  AppActionTypes,
  SEND_USERS_FILTERS,
  SAVE_APPS,
  SHOW_LOAD_APPS_FAILURE
} from './types';
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

export const showLoadAppsFailure = (): AppActionTypes => ({
  type: SHOW_LOAD_APPS_FAILURE
});
