import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useParams} from 'react-router';

import {todoSelector} from '../../store/todo-selector';
import {Header} from './compnents/Header/Header';
import {TodoList} from './TodoList';
import {AddItemForm, changeTodoStatus} from './index';
import {params} from '../../Routes';
import {ROUTING_DATA} from '../../App.constants';

export const TodoListContainer = () => {
    const finalTodo = useSelector(todoSelector);
    const dispatch = useDispatch();
    const location = useLocation();
    const param = useParams<params>();

    const params = new URLSearchParams(location.search);
    const doneStatus = params.get(ROUTING_DATA.SHOW_DONE);
    const searchTodo = params.get(ROUTING_DATA.SEARCH_TEXT);

    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);

    let todos = finalTodo;

    if (doneStatus === 'true') {
        todos = finalTodo.filter(ft => ft.isDone);
    }

    if (searchTodo) {
        todos = finalTodo.filter(ft => {
            const title = ft.title.toLowerCase();
            const filter = searchTodo.toLowerCase();
            return title.includes(filter);
        });
    }

    return (
        <div>
            <Header />
            <AddItemForm formText="Enter new Todo name" />
            <TodoList
                onChangeTodoStatus={onChangeTodoStatus}
                todo={todos}
            />
        </div>
    );
};
