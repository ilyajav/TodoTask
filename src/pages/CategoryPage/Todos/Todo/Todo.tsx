// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import {Link} from 'react-router-dom';
import style from './Todo.module.css';

type TodoPropsType = {
    onChangeTodoStatus: (e: React.MouseEvent<HTMLInputElement>) => void;
    todoTitle: string
    isDone: boolean;
    todoId: string;
}

export const Todo: FC<TodoPropsType> = (
    {
        onChangeTodoStatus,
        todoTitle,
        isDone,
        todoId,
    }
) => (

    <div>
        <input type="checkbox" checked={isDone} onClick={onChangeTodoStatus} />
        <span className={style.item}>{todoTitle}</span>
        <IconButton color="primary">
            <Link to={`/todosEdit?todoId=${todoId}`}><CreateIcon /></Link>
        </IconButton>
    </div>

);
