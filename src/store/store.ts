import {createStore, combineReducers} from 'redux';
import {appReducer} from './app-reducer';
import {todoReducer} from './todo-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    todoData: todoReducer,
});
export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>
