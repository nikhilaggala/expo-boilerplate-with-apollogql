import { createTypes } from 'reduxsauce';

export default createTypes(`
  FETCH_VIDEOS_PENDING
  FETCH_VIDEOS_SUCCESS
  FETCH_VIDEOS_FAILURE
`, {
  prefix: 'videosList/'
});
