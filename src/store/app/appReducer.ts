import { Reducer } from 'redux';
import { AppActionTypes, SAVE_APPS } from './types';
import { App } from '../../types';

type AppState = { items: App[] };

const initialState: AppState = { items: [] };

export const appReducer: Reducer<AppState, AppActionTypes> = (
  state = initialState,
  action
): AppState => {
  switch (action.type) {
    case SAVE_APPS: {
      return { ...state, items: action.payload };
    }
    default:
      return state;
  }
};
