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

import {todoSelector} from '../../store/todo-selector';
import {Header} from './compnents/Header/Header';
import {TodoList} from './TodoList';
import {
    changeTodoStatus,
    Todo,
    AppRootStateType,
    AddItemForm, Todos,
} from './index';
import {ROUTING_DATA} from '../../App.constants';

export const TodoListContainer = () => {
    const state = useSelector<AppRootStateType, AppRootStateType>(state => state);

    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const doneStatus = params.get(ROUTING_DATA.SHOW_DONE);
    const searchTodo = params.get(ROUTING_DATA.SEARCH_TEXT);

    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);

    const finalTodo = useSelector<AppRootStateType, Todos>(state => todoSelector(doneStatus, searchTodo, state));

    return (
        <div>
            <Header />
            <AddItemForm formText="Enter new Todo name" />
            <TodoList
                onChangeTodoStatus={onChangeTodoStatus}
                todo={finalTodo}
            />
        </div>
    );
};
