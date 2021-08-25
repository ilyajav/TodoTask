import React, {useCallback} from 'react';
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

    const onChangeTodoStatus = useCallback((isDone: boolean, id: string) => {
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
            {
                filteredTodo.map(td => (
                    <div>
                        <HeaderEdit
                            title={td.title}
                            key={td.id}
                        />
                        <TodoListEdit
                            onChangeTodoStatus={onChangeTodoStatus}
                            isDone={td.isDone}
                            description={td.description}
                            title={td.title}
                            onChangeTodoTitle={onChangeTodoTitle}
                            onChangeTodoDescription={onChangeTodoDescription}
                            id={td.id}
                            key={td.id}
                        />
                    </div>
                ))
            }
        </div>
    );
};
