import { Action } from 'redux';
import { App, UserFiltersDto } from '../../types';

export const SEND_USERS_FILTERS = 'SEND_USERS_FILTERS';
export const SAVE_APPS = 'SAVE_APPS';
export const SHOW_LOAD_APPS_FAILURE = 'FAILED_LOAD_APPS';

export interface SendUsersFilters extends Action<typeof SEND_USERS_FILTERS> {
  payload: UserFiltersDto;
}
interface SaveAppsAction extends Action<typeof SAVE_APPS> {
  payload: App[];
}

type ShowLoadAppsFailure = Action<typeof SHOW_LOAD_APPS_FAILURE>;

export type AppActionTypes =
  | SendUsersFilters
  | SaveAppsAction
  | ShowLoadAppsFailure;
