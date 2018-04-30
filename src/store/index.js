import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';

import profile from './profile';
import match from './match';
import player from './player';

export const history = createHistory();
const rootReducer = combineReducers({
  router: routerReducer,
  profile,
  player,
  match
});

const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history), logger];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
