import { appReducer, AppState } from './appReducer';
import { FakeUsersFiltersDto, FakeApp } from '../../../test-utils';
import { sendUsersFilters, saveApps, showLoadAppsFailure } from './actions';

describe('appReducer', () => {
  let state: AppState;

  test('SEND_USERS_FILTERS', () => {
    state = { items: [FakeApp(), FakeApp()] };

    const response = appReducer(state, sendUsersFilters(FakeUsersFiltersDto()));

    expect(response).toEqual({
      items: state.items,
      loading: true,
      error: false,
      fetched: false
    });
  });

  test('SAVE_APPS', () => {
    state = { items: [], loading: true, error: false, fetched: true };

    const apps = [FakeApp(), FakeApp()];
    const response = appReducer(state, saveApps(apps));

    expect(response).toEqual({
      items: apps,
      loading: false,
      error: false,
      fetched: true
    });
  });

  test('SHOW_LOAD_APPS_FAILURE', () => {
    state = { items: [], loading: true, error: false, fetched: false };

    const response = appReducer(state, showLoadAppsFailure());

    expect(response).toEqual({
      items: [],
      loading: false,
      error: true,
      fetched: true
    });
  });

  test('default', () => {
    const apps = [FakeApp(), FakeApp()];

    state = { items: apps, loading: true, error: false, fetched: true };

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const response = appReducer(state, {});

    expect(response).toEqual({
      items: apps,
      loading: true,
      error: false,
      fetched: true
    });
  });
});
