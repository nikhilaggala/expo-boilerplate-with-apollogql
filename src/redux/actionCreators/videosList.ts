import actionsTypes from '../actionsTypes/videosList';
import * as Types from '../types';


const fetchVideosPending = ({ limit, skip }: { limit?: number, skip?: number }): Types.TActionCreatorType => ({
  type: actionsTypes.FETCH_VIDEOS_PENDING,
  payload: {
    limit,
    skip
  }
});

function fetchVideosSuccess(payload: any) {
  return {
    type: actionsTypes.FETCH_VIDEOS_SUCCESS,
    payload
  };
}

function fetchVideosFailure(payload?: any) {
  return {
    type: actionsTypes.FETCH_VIDEOS_FAILURE,
  };
}


export default {
  fetchVideosPending,
  fetchVideosSuccess,
  fetchVideosFailure,
};
