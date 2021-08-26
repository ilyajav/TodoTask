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
    AddItemForm, TodosType,
} from './index';
import {ROUTING_DATA} from '../../App.constants';

export const TodoListContainer = () => {
    const state = useSelector<AppRootStateType, AppRootStateType>(state => state);
    const todosData = useSelector<AppRootStateType, TodoType>(state => state.todoData.todos);

    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const doneStatus = params.get(ROUTING_DATA.SHOW_DONE);
    const searchTodo = params.get(ROUTING_DATA.SEARCH_TEXT);

    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);

    const getTodos = (state: AppRootStateType) => state.todoData.todos;
    const getTodosId = (state: AppRootStateType) => state.todoData.todosId;
    // eslint-disable-next-line consistent-return
    const getTodosSuper = createSelector(getTodos, getTodosId, (todos: TodoType) => {
        let currentId;
        let filteredTodo;
        for (let i = 0; i < getTodosId.length; i += 1) {
            currentId = getTodosId(state)[i];
            filteredTodo = todosData[currentId];
        }
        if (doneStatus === 'true' && filteredTodo) {
            if (filteredTodo.isDone) {
                return filteredTodo;
            }
        }
        if (searchTodo && filteredTodo) {
            const title = filteredTodo.title.toLowerCase();
            const filter = searchTodo.toLowerCase();
            return title.includes(filter);
        }
    });

    const finalTodo = useSelector<TodosType, TodosType>(getTodosSuper);

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
