import { Reducer } from 'redux';
import {
  AppActionTypes,
  SAVE_APPS,
  SEND_USERS_FILTERS,
  SHOW_LOAD_APPS_FAILURE
} from './types';
import { App } from '../../types';

export type AppState = {
  items: App[];
  loading?: boolean;
  error?: boolean;
  fetched?: boolean;
};

const initialState: AppState = { items: [] };

export const appReducer: Reducer<AppState, AppActionTypes> = (
  state = initialState,
  action
): AppState => {
  switch (action.type) {
    case SEND_USERS_FILTERS:
      return { ...state, loading: true, error: false, fetched: false };
    case SAVE_APPS: {
      return { ...state, items: action.payload, loading: false };
    }
    case SHOW_LOAD_APPS_FAILURE:
      return { ...state, loading: false, error: true, fetched: true };
    default:
      return state;
  }
};
