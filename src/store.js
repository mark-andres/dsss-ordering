import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from './reducers/categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            dsssApp: categoriesReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    
    return store
}