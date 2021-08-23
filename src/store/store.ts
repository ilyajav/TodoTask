import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';

import {todoReducer} from './todo-reducer';

const rootReducer = combineReducers({
    todoData: todoReducer,
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export type AppRootStateType = ReturnType<typeof rootReducer>
