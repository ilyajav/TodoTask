import React, {useCallback} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {useLocation} from 'react-router';

import {
    MODE,
    ROUTING_DATA,
} from '../../App.constants';
import {
    todoSelector,
    changeTodo,
} from '../../store';
import {TodoListPageEdit} from './TodoListPageEdit';

export const TodoListEditContainer = () => {
    const finalTodo = useSelector(todoSelector);
    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const todoId = params.get(ROUTING_DATA.TODO_TEXT_ID);

    const mode = MODE.EDIT;

    const onChangeTodo = useCallback((title: string, id: string, description: string, isDone: boolean) => {
        dispatch(changeTodo(title, id, description, isDone));
    }, [dispatch]);

    return (
        <TodoListPageEdit
            mode={mode}
            todoData={finalTodo}
            onChangeTodo={onChangeTodo}
            todoId={todoId}
        />
    );
};
