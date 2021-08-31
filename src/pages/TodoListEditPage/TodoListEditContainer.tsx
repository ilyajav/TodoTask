import React, {useCallback} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {useLocation} from 'react-router';

import {ROUTING_DATA} from '../../App.constants';
import {TodoListEdit} from './TodoListEdit';
import {HeaderEdit} from './components/HeaderEdit';
import {
    todoSelector,
    changeTodo,
} from '../../store';

export const TodoListEditContainer = () => {
    const finalTodo = useSelector(todoSelector);
    const dispatch = useDispatch();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const todoId = params.get(ROUTING_DATA.TODO_TEXT_ID);

    let filteredTodo = finalTodo;
    if (todoId) {
        filteredTodo = finalTodo.filter(td => td.id === todoId);
    }

    const onChangeTodo = useCallback((title: string, id: string, description: string, isDone: boolean) => {
        dispatch(changeTodo(title, id, description, isDone));
    }, [dispatch]);
    return (
        <div>
            {
                filteredTodo.map(td => (
                    <div key={td.id}>
                        <HeaderEdit
                            title={td.title}
                        />
                        <TodoListEdit
                            onChangeTodo={onChangeTodo}
                            isDone={td.isDone}
                            description={td.description}
                            title={td.title}
                            id={td.id}
                            key={td.id}
                        />
                    </div>
                ))
            }
        </div>
    );
};
