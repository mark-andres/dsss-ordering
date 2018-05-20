import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import menuReducer from './reducers/menu';
import orderReducer from './reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            menu: menuReducer,
            order: orderReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    
    return store
}