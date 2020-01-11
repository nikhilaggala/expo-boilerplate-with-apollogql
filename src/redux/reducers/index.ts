import { combineReducers } from 'redux';

import videosListReducer from './videosList';

const appReducer = combineReducers({
  videosList: videosListReducer
});

export type RootState = ReturnType<typeof appReducer>;

export default appReducer;
