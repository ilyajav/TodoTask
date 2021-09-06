import React, {
    ChangeEvent,
    useCallback,
} from 'react';
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
    changeTodoStatus,
    addTodo, addCategory,
} from '../../store';
import {TodoListPage} from './TodoListPage';
import {commonStyle} from '../CommonComponents';

export const TodoListContainer = () => {
    const finalTodo = useSelector(todoSelector);
    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const doneStatus = params.get(ROUTING_DATA.SHOW_DONE);
    const searchTodo = params.get(ROUTING_DATA.SEARCH_TEXT);
    const categoryId = params.get(ROUTING_DATA.CATEGORY_TEXT_ID);
    const todoId = params.get(ROUTING_DATA.TODO_TEXT_ID);

    const mode = MODE.SHOW;

    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);
    const onAddTodo = (title: string, categoryId: string) => {
        dispatch(addTodo(title, categoryId));
    };
    const onAddCategory = useCallback((title: string) => {
        // eslint-disable-next-line no-debugger
        debugger;
        dispatch(addCategory(title));
    }, [dispatch]);

    return (
        <TodoListPage
            onChangeTodoStatus={onChangeTodoStatus}
            todoData={finalTodo}
            styleData={commonStyle}
            doneStatus={doneStatus}
            searchTodo={searchTodo}
            categoryId={categoryId}
            onAddTodo={onAddTodo}
            onAddCategory={onAddCategory}
            mode={mode}
            todoId={todoId}
        />
    );
};
