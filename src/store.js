import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import appReducer from './reducers/app';

export default () => {
  const history = createBrowserHistory();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    connectRouter(history)(appReducer),
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  )

  return { store, history };
}