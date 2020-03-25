import { testSaga } from 'redux-saga-test-plan';
import { sendUsersFiltersSaga } from './watchSendUsersFilters.saga';
import { sendUsersFilters, saveApps, showLoadAppsFailure } from '../actions';
import { FakeUsersFiltersDto, FakeApp } from '../../../test-utils';
import { SendUsersFilters } from '../types';
import { GetFilteredApps } from '../api';

describe('watchSendUsersFilters', () => {
  test('success', () => {
    const userFilters = FakeUsersFiltersDto();

    const apps = [FakeApp(), FakeApp(), FakeApp()];
    testSaga(
      sendUsersFiltersSaga,
      sendUsersFilters(userFilters) as SendUsersFilters
    )
      .next()
      .call(GetFilteredApps, userFilters)
      .next({ data: apps })
      .put(saveApps(apps))
      .next()
      .isDone();
  });

  test('failure', () => {
    const userFilters = FakeUsersFiltersDto();

    testSaga(
      sendUsersFiltersSaga,
      sendUsersFilters(userFilters) as SendUsersFilters
    )
      .next()
      .call(GetFilteredApps, userFilters)
      .throw(new Error())
      .put(showLoadAppsFailure())
      .next()
      .isDone();
  });
});
