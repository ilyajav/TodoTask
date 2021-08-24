import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router';

import {AppRootStateType} from '../../store/store';
import {
    changeTodoDescription,
    changeTodoStatus, changeTodoTitle,
    TodosType,
} from '../../store/todo-reducer';
import {ROUTING_DATA} from '../../App.constants';
import {TodoListEdit} from './TodoListEdit';
import {HeaderEdit} from './components/HeaderEdit';

export const TodoListEditContainer = () => {
    const todosData = useSelector<AppRootStateType, TodosType[]>(state => state.todoData);
    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const todoId = params.get(ROUTING_DATA.TODO_TEXT_ID);

    let filteredTodo = todosData;
    if (todoId) {
        filteredTodo = todosData.filter(td => td.id === todoId);
    }

    const title = filteredTodo.map(td => td.title);
    const isDone = filteredTodo.map(td => td.isDone);
    const description = filteredTodo.map(td => td.description);
    const id = filteredTodo.map(td => td.id);

    const onChangeTodoStatus = useCallback((e: ChangeEvent<HTMLInputElement>, id: string) => {
        const isDone = e.currentTarget.checked;
        dispatch(changeTodoStatus(id, isDone));
    }, [dispatch]);
    const onChangeTodoTitle = useCallback((title: string, id: string) => {
        dispatch(changeTodoTitle(title, id));
    }, [dispatch]);
    const onChangeTodoDescription = useCallback((description: string, id: string) => {
        dispatch(changeTodoDescription(description, id));
    }, [dispatch]);
    return (
        <div>
            <HeaderEdit title={title[0]} />
            <TodoListEdit
                onChangeTodoStatus={onChangeTodoStatus}
                isDone={isDone[0]}
                description={description[0]}
                title={title[0]}
                onChangeTodoTitle={onChangeTodoTitle}
                onChangeTodoDescription={onChangeTodoDescription}
                id={id[0]}
            />
        </div>
    );
};
