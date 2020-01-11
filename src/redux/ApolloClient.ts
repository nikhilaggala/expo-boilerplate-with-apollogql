// import {Plugins} from '@capacitor/core';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

const request = async (operation: any) => {
  operation.setContext({
    headers: {
      // authorization: `Bearer ${value}`
      // 'Access-Control-Request-Method': 'POST',
      // 'Access-Control-Request-Headers': 'content-type'
    }
  });
};

const requestLink = new ApolloLink((operation: any, forward: any) =>
  new Observable((observer: any) => {
    let handle: any;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }: any) => {
      if (graphQLErrors) {
        console.log('graphQLErrors ', graphQLErrors);
      }
      if (networkError) {
        console.log('network error ', networkError);
      }
    }),
    requestLink,
    new HttpLink({
      uri: 'https://nissi.nikhilaggala.com/graphql',
    })
  ]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all'
    }
  }
});
