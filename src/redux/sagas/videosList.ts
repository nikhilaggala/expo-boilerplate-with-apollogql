import { fork, call, take, put } from 'redux-saga/effects';

import videoListActions from '../actionCreators/videosList';
import actionsTypes from '../actionsTypes/videosList';

import { TVideosById, TVideoItem } from '../types';

import apolloGqlClient from '../ApolloClient';

import * as videoItemQueries from '../../gqlQueries/videoQueries/queries';


function* fetchAllVideos() {

  while(true) {
    const { payload: { limit, skip = 0 } } = yield take(actionsTypes.FETCH_VIDEOS_PENDING);

    try {
      const gqlPayload = {
        query: videoItemQueries.fetchVideoItems,
        variables: {
          limit: limit,
          skip: skip
        }
      }

      const gqlResponse = yield call([apolloGqlClient, apolloGqlClient.query], gqlPayload);

      if (gqlResponse && gqlResponse.data) {
        const videosById = {} as TVideosById;
        let videoIdsList = [] as string[];
        let isMoreContentAvailable = true;

        gqlResponse.data.videoItems.forEach((item: TVideoItem) => {
          if (item.snippet.resourceId.videoId) {
            videoIdsList.push(item.snippet.resourceId.videoId);
            return videosById[item.snippet.resourceId.videoId] = item;
          }
        });

        // Make isMoreContentAvailable true on end reached
        if (gqlResponse.data.videoItems.length === 0) {
          isMoreContentAvailable = false;
        }

        yield put(videoListActions.fetchVideosSuccess({ videoIdsList, videosById, isMoreContentAvailable }));
      }


    } catch(e) {
      console.log('Error in fetching all videos list', e);

      yield put(videoListActions.fetchVideosFailure());
    }
  }
}

function* watcher() {
  yield fork(fetchAllVideos);
}

export default {
  watcher
};
