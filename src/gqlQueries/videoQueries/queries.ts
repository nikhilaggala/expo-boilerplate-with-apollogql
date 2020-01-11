import gql from 'graphql-tag';

export const fetchVideoItems = gql`
  query fetchVideoItems($limit: Int, $skip: Int) {
    videoItems(limit: $limit, skip: $skip) {
      kind
      etag
      id
      snippet
    }
  }
`;
