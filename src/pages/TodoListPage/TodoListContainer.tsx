import React,
{
    ChangeEvent,
    useCallback,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {useLocation} from 'react-router';

import {createSelector} from 'reselect';
import {Header} from './compnents/Header/Header';
import {TodoList} from './TodoList';
import {
    changeTodoStatus,
    TodoType,
    AppRootStateType,
    AddItemForm,
} from './index';
import {ROUTING_DATA} from '../../App.constants';

export const TodoListContainer = () => {
    const todosData = useSelector<AppRootStateType, TodoType>(state => state.todoData.todos);
    const state = useSelector<AppRootStateType, AppRootStateType>(state => state);

    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const doneStatus = params.get(ROUTING_DATA.SHOW_DONE);
    const searchTodo = params.get(ROUTING_DATA.SEARCH_TEXT);

    const getTodos = (state: AppRootStateType) => state.todoData.todos;
    const getTodosId = (state: AppRootStateType) => state.todoData.todosId;
    const getTodosSuper = createSelector(getTodos, getTodosId, (todos: TodoType) => {
        let currentId;
        let filteredTodo;
        for (let i = 0; i < getTodosId.length; i += 1) {
            currentId = getTodosId(state)[i];
            filteredTodo = todosData[currentId];
            if (doneStatus === 'true') {
                if (filteredTodo.isDone) {
                    return filteredTodo;
                }
            }
            if (searchTodo) {
                const title = filteredTodo.title.toLowerCase();
                const filter = searchTodo.toLowerCase();
                return title.includes(filter);
            }
        }
        return filteredTodo;
    });
    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);

    return (
        <div>
            <Header />
            <AddItemForm formText="Enter new Todo name" />
            <TodoList
                onChangeTodoStatus={onChangeTodoStatus}
                todo={getTodosSuper(state)}
            />
        </div>
    );
};
