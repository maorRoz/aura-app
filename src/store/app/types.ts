import { Action } from 'redux';
import { App, FilterCriteria } from '../../types';

export const SEND_USERS_FILTERS = 'SEND_USERS_FILTERS';
export const SAVE_APPS = 'SAVE_APPS';

export interface SendUsersFilters extends Action<typeof SEND_USERS_FILTERS> {
  payload: FilterCriteria;
}
interface SaveAppsAction extends Action<typeof SAVE_APPS> {
  payload: App[];
}

export type AppActionTypes = SendUsersFilters | SaveAppsAction;
