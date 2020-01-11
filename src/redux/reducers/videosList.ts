import { createReducer } from 'reduxsauce';
import * as R from 'ramda';

import videosListTypes from '../actionsTypes/videosList';
import { TActionCreatorType } from '../types';

type reducerParamsType = {
  state: TVideosListInitialState
  action: TActionCreatorType
};

interface TVideosListInitialState {
  videoIdsList: any,
  videosByVideoId: any,
  loading: boolean,
  error: boolean,
  isMoreContentAvailable: boolean
};

const INITIAL_STATE = {
  videoIdsList: [],
  videosByVideoId: {},
  loading: false,
  error: false,
  isMoreContentAvailable: true,
};

const fetchVideosPending = (state: TVideosListInitialState) => {
  const transformations = {
    loading: R.T,
    error: R.F
  };

  return R.evolve(transformations, state);
};

const fetchVideosSuccess = (state: TVideosListInitialState, action: TActionCreatorType) => {
  const { videoIdsList, videosById, isMoreContentAvailable, nextPageToken } = action.payload;

  const transformations = {

    videoIdsList: R.concat(R.__, videoIdsList),
    videosByVideoId: Object.keys(state.videosByVideoId).length
      ? () => ({
        ...state.videosByVideoId,
        ...videosById
      })
      : () => videosById,

    nextPageToken: () => nextPageToken,
    isMoreContentAvailable: () => isMoreContentAvailable,

    loading: R.F
  };

  return R.evolve(transformations, state);
};

const fetchVideosFailure = (state: TVideosListInitialState) => {

  const transformations = {
    loading: R.F,
    error: R.T
  };

  return R.evolve(transformations, state);
};

const ACTION_HANDLERS = {
  [videosListTypes.FETCH_VIDEOS_PENDING]: fetchVideosPending,
  [videosListTypes.FETCH_VIDEOS_SUCCESS]: fetchVideosSuccess,
  [videosListTypes.FETCH_VIDEOS_FAILURE]: fetchVideosFailure,
};


export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
