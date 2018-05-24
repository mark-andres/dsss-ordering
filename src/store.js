import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import menuReducer from './reducers/menu';
import orderReducer from './reducers/order';
import scratchPadReducer from './reducers/scratchPad';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            menu: menuReducer,
            order: orderReducer,
            scratchPad: scratchPadReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    
    return store
}