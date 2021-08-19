// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import style from '../Todos.module.css';
import {TodosType} from '../../../../store/todo-reducer';

type TodoPropsType = {
    todo: TodosType[]
    categoryId: string
    onChangeTodoStatus: (e: React.MouseEvent<HTMLInputElement>) => void;
    todoTitle: string
}

export const Todo: FC<TodoPropsType> = (
    {
        todo, categoryId, onChangeTodoStatus, todoTitle,
    }
) => (

    <div className={style.item}>
        {todoTitle}
    </div>

);
