import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import menuCategoriesReducer from './reducers/menuCategories';
import orderReducer from './reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            menuCategories: menuCategoriesReducer,
            order: orderReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    
    return store
}