// eslint-disable-next-line no-use-before-define
import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import style from './Todo.module.css';
import {AddItemForm} from '../../../utils/AddItemForm';

type TodoPropsType = {
    onChangeTodoStatus: (e: React.MouseEvent<HTMLInputElement>) => void;
    todoTitle: string
    isDone: boolean;
}

export const Todo: FC<TodoPropsType> = (
    {
        onChangeTodoStatus,
        todoTitle,
        isDone,
    }
) => (

    <div>
        <input type="checkbox" checked={isDone} onClick={onChangeTodoStatus} />
        <span className={style.item}>{todoTitle}</span>
        <IconButton color="primary" className={style.icon}>
            <CreateIcon />
        </IconButton>
    </div>
);
