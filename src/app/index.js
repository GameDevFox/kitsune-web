import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import Console from './console';
import RequestList from './requests';
import ViewTree from './view-tree';

import store from './store';



const App = () => (
  <Provider store={store}>
    <Console>
      <h1 className="title">Kitsune</h1>
      <ViewTree/>
      <RequestList/>
    </Console>
  </Provider>
);

export default hot(module)(App);
