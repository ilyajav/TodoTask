import React, {
    ChangeEvent,
    useCallback,
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {useLocation} from 'react-router';

import {TodoList} from './TodoList';
import {ROUTING_DATA} from '../../App.constants';
import {
    AddItemForm,
    Header,
} from './components';
import {
    todoSelector,
    changeTodoStatus,
} from '../../store';

export const TodoListContainer = () => {
    const finalTodo = useSelector(todoSelector);
    const dispatch = useDispatch();
    const location = useLocation();

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
