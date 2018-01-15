import { combineReducers, createStore } from 'redux';

import entryReducer from './entry/reducer';
import nodeListReducer from './node-list/reducer';

const reducer = combineReducers({
  entry: entryReducer,
  nodeList: nodeListReducer
});

import * as actionCreators from './action-creators';

// eslint-disable-next-line no-warning-comments
// TODO: Remove this in prod
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
  actionCreators
});

const store = createStore(reducer, reduxDevTools);
export default store;
