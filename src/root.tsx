import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
// to navigate without having prop
// import NavigationService from 'services/NavigationService';
// import AsyncStorage from '@react-native-community/async-storage';
// import bootstrapAction from 'actions/bootstrap';
// import store from './store';
import createStore from './store';

import AppContainer from './screens';

export const store = createStore();

// React Native App
export default function App() {
  // useEffect(() => {
  //   AsyncStorage.getItem('nobiltareUser').then((result) => {
  //     store.dispatch(bootstrapAction.bootstrap(JSON.parse(result)));
  //   });
  // }, []);

  return (
    // Redux: Global Store
    <Provider store={store}>
      <AppContainer
        // ref={(navigatorRef) => {
        //   NavigationService.setTopLevelNavigator(navigatorRef);
        // }}
      />
    </Provider>
  );
}
