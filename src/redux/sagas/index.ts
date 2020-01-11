import { fork } from 'redux-saga/effects';

// import authSaga from './auth';
// import bootstrapSaga from './bootstrap';
import videosListSaga from './videosList';

export default function* root() {
  // yield fork(authSaga.watcher);
  // yield fork(bootstrapSaga.watcher);
  yield fork(videosListSaga.watcher);
}
