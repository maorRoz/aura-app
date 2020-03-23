import { call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { SEND_USERS_FILTERS, SendUsersFilters } from '../types';
import { App } from '../../../types';
import { GetFilteredApps } from '../api';
import { saveApps } from '../actions';

export function* sendUsersFiltersSaga(action: SendUsersFilters) {
  try {
    const response: AxiosResponse<App[]> = yield call(
      GetFilteredApps,
      action.payload
    );
    const apps = response.data;
    yield put(saveApps(apps));
  } catch (e) {
    // add error
  }
}

export function* watchSendUsersFiltersSaga() {
  yield takeLatest(SEND_USERS_FILTERS, sendUsersFiltersSaga);
}
