// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {useDispatch} from 'react-redux';
import {Todo} from './Todo/Todo';
import style from './Todos.module.css';
import {changeTodoStatus, TodosType} from '../../../store/todo-reducer';

type TodoTypePropsType = {
    todo: TodosType[]
    categoryId: string
}

export const TodosContainer: FC<TodoTypePropsType> = (
    {todo, categoryId}
) => {
    const dispatch = useDispatch();

    return (
        <div>
            {
                todo.map(td => {
                    const onChangeTodoStatus = (e: React.MouseEvent<HTMLInputElement>) => {
                        const isDone = e.currentTarget.checked;
                        dispatch(changeTodoStatus(categoryId, td.id, isDone));
                    };

                    return (
                        <div key={td.id} className={style.item}>
                            <Todo
                                todo={todo}
                                categoryId={categoryId}
                                onChangeTodoStatus={onChangeTodoStatus}
                                todoTitle={td.title}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
};
