import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';

import {todoReducer} from './todo-reducer';
import {categoryReducer} from './category-reducer';

const rootReducer = combineReducers({
    todoData: todoReducer,
    categoryData: categoryReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const createStoreWithState =
    (initialState = {}) => createStore(rootReducer, initialState, composeEnhancers(applyMiddleware()));

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export type AppRootState = ReturnType<typeof rootReducer>
