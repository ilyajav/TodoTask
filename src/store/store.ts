import {createStore, combineReducers} from "redux";
import {appReducer} from "./app-reducer";
import {categoryReducer} from "./category-reducer";
import {todoReducer} from "./todo-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    categoryData: categoryReducer,
    todoData: todoReducer,
})
export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
