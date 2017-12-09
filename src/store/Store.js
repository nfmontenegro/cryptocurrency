import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import RootReducer from '../reducers';

const middleware = applyMiddleware(thunk);

const Store = createStore(
  RootReducer,
  compose(
    middleware,
  )
);

export default Store;