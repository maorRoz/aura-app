import { all, fork } from 'redux-saga/effects';
import { watchSendUsersFiltersSaga } from './app';

const sagas = [watchSendUsersFiltersSaga];

export function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}
